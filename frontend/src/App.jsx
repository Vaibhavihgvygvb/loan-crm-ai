import { useEffect, useMemo, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
} from 'recharts';

const API_BASE = 'https://vaibhav991-loan-crm-ai.hf.space';

const loanFields = [
  'monthly_income',
  'existing_emi',
  'credit_score',
  'employment_years',
  'relationship_years',
  'avg_bank_balance',
  'collateral_value',
  'fraud_risk_score',
  'bank_policy_multiplier',
];

async function api(endpoint, options = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, options);
  return res.json();
}

export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('loancrm_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [tab, setTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [dashboard, setDashboard] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [auditLogs, setAuditLogs] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [history, setHistory] = useState([]);
  const [loanResult, setLoanResult] = useState(null);
  const [explainability, setExplainability] = useState(null);
  const [drift, setDrift] = useState(null);
  const [search, setSearch] = useState('');

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const data = await api('/rm/dashboard');
      setDashboard(data);
    } finally {
      setLoading(false);
    }
  };

  const fetchForecast = async () => {
    const data = await api('/forecast/loan-demand');
    setForecast(data);
  };

  const fetchAudit = async () => {
    const data = await api('/audit/logs');
    setAuditLogs(Array.isArray(data) ? data : []);
  };

  const fetchCustomers = async () => {
    const data = await api('/rm/customers/');
    setCustomers(data.customers || []);
  };

  const fetchHistory = async () => {
    if (!user?.user_id) return;
    const data = await api(`/history/${user.user_id}`);
    setHistory(data.applications || []);
  };

  const runDriftCheck = async () => {
    const payload = {
      monthly_income: 5000000,
      credit_score: 950,
      existing_emi: 250000,
    };
    const data = await api('/drift/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    setDrift(data);
  };

  useEffect(() => {
    if (user) {
      fetchDashboard();
      fetchForecast();
      fetchAudit();
      fetchCustomers();
      fetchHistory();
    }
  }, [user]);

  const logout = () => {
    localStorage.removeItem('loancrm_user');
    setUser(null);
  };

  const filteredCustomers = useMemo(() => {
    return customers.filter((c) =>
      JSON.stringify(c).toLowerCase().includes(search.toLowerCase())
    );
  }, [customers, search]);

  if (!user) return <Auth setUser={setUser} />;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="flex flex-wrap gap-3 mb-6">
        {['dashboard', 'loan', 'history', 'customers', 'audit', 'forecast', 'drift'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-4 py-2 bg-slate-800 rounded-xl"
          >
            {t}
          </button>
        ))}
        <button onClick={logout} className="px-4 py-2 bg-red-600 rounded-xl">
          Logout
        </button>
      </div>

      {loading && <div className="mb-4">Loading...</div>}

      {tab === 'dashboard' && dashboard && <Dashboard dashboard={dashboard} />}
      {tab === 'loan' && (
        <LoanApply
          user={user}
          setLoanResult={setLoanResult}
          setExplainability={setExplainability}
        />
      )}
      {tab === 'history' && <History history={history} />}
      {tab === 'customers' && (
        <Customers
          customers={filteredCustomers}
          search={search}
          setSearch={setSearch}
        />
      )}
      {tab === 'audit' && <Audit logs={auditLogs} />}
      {tab === 'forecast' && <Forecast forecast={forecast} />}
      {tab === 'drift' && <Drift drift={drift} runDriftCheck={runDriftCheck} />}

      {loanResult && <LoanResult result={loanResult} />}
      {explainability && <Explainability data={explainability} />}
    </div>
  );
}

function Auth({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const submit = async () => {
    const endpoint = isLogin ? '/login' : '/register';
    const result = await api(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (result.user_id) {
      localStorage.setItem('loancrm_user', JSON.stringify(result));
      setUser(result);
    } else {
      alert(result.message || 'Failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-slate-900 p-8 rounded-3xl">
      <h1 className="text-3xl font-bold mb-6">Loan CRM Intelligence</h1>
      {!isLogin && (
        <input className="input" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      )}
      <input className="input" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input className="input" type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button onClick={submit} className="w-full bg-blue-600 p-3 rounded-xl mt-4">
        {isLogin ? 'Login' : 'Register'}
      </button>
      <button onClick={() => setIsLogin(!isLogin)} className="mt-4 text-slate-400">
        {isLogin ? 'Create account' : 'Already have account?'}
      </button>
    </div>
  );
}

function Dashboard({ dashboard }) {
  const cards = [
    ['Applications', dashboard.total_applications],
    ['Approved', dashboard.approved_loans],
    ['Fraud Cases', dashboard.fraud_cases],
    ['Avg Loan', `₹${Math.round(dashboard.average_recommended_loan)}`],
  ];

  return <GridCards cards={cards} />;
}

function LoanApply({ user, setLoanResult, setExplainability }) {
  const [form, setForm] = useState({});

  const submit = async () => {
    const payload = { user_id: user.user_id, ...form };
    const result = await api('/apply-loan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    setLoanResult(result);

    const explain = await api('/explain/loan-approval', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    setExplainability(explain);
  };

  return (
    <div className="grid gap-4">
      <div className="grid md:grid-cols-2 gap-4">
        {loanFields.map((field) => (
          <input
            key={field}
            className="input"
            placeholder={field}
            onChange={(e) => setForm({ ...form, [field]: Number(e.target.value) })}
          />
        ))}
      </div>
      <button onClick={submit} className="bg-emerald-600 p-3 rounded-xl">
        Apply Loan
      </button>
    </div>
  );
}

function LoanResult({ result }) {
  return <GridCards cards={[
    ['Approval', result.approval_prediction ? 'Approved' : 'Rejected'],
    ['Fraud', result.fraud_prediction ? 'Risk' : 'Safe'],
    ['Amount', `₹${Math.round(result.recommended_loan_amount)}`],
  ]} />;
}

function Explainability({ data }) {
  const chartData = Object.entries(data.feature_impact || {}).map(([name, value]) => ({ name, value }));

  return (
    <div className="bg-slate-900 p-6 rounded-2xl mt-6">
      <h2 className="text-xl font-bold mb-4">Explainability</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function History({ history }) {
  return <GridCards cards={history.map((h) => [`Loan #${h.id}`, `₹${Math.round(h.recommended_loan_amount)}`])} />;
}

function Customers({ customers, search, setSearch }) {
  return (
    <div>
      <input
        className="input mb-4"
        placeholder="Search customers"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <GridCards cards={customers.map((c) => [c.customer_name || 'Customer', `₹${Math.round(c.recommended_loan_amount || 0)}`])} />
    </div>
  );
}

function Audit({ logs }) {
  return <GridCards cards={logs.map((l) => [`User ${l.user_id}`, `₹${Math.round(l.recommended_loan_amount || 0)}`])} />;
}

function Forecast({ forecast }) {
  if (!forecast?.forecast_next_3_months) return null;

  const chartData = forecast.forecast_next_3_months.map((v, i) => ({ month: `M${i + 1}`, value: v }));

  return (
    <div className="bg-slate-900 p-6 rounded-2xl">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function Drift({ drift, runDriftCheck }) {
  return (
    <div>
      <button onClick={runDriftCheck} className="bg-orange-600 p-3 rounded-xl mb-4">
        Run Drift Check
      </button>
      {drift?.drift_report && (
        <GridCards
          cards={Object.entries(drift.drift_report).map(([k, v]) => [k, v.drift_detected ? 'Drift' : 'Stable'])}
        />
      )}
    </div>
  );
}

function GridCards({ cards }) {
  return (
    <div className="grid md:grid-cols-3 gap-4 mt-4">
      {cards.map(([title, value], idx) => (
        <div key={idx} className="bg-slate-900 p-6 rounded-2xl shadow-lg">
          <h3 className="text-slate-400">{title}</h3>
          <p className="text-2xl font-bold mt-2">{value}</p>
        </div>
      ))}
    </div>
  );
}
