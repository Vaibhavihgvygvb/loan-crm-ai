import { useState } from "react";

function App() {
  const API_BASE = "https://vaibhav991-loan-crm-ai.hf.space";

  const [isLogin, setIsLogin] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loanData, setLoanData] = useState({
    monthly_income: "",
    existing_emi: "",
    credit_score: "",
    employment_years: "",
    relationship_years: "",
    avg_bank_balance: "",
    collateral_value: "",
    fraud_risk_score: "",
    bank_policy_multiplier: "",
  });

  const [result, setResult] = useState(null);
  const [explanation, setExplanation] = useState(null);
  const [rmData, setRmData] = useState(null);
  const [historyData, setHistoryData] = useState(null);
  const [rmCustomers, setRmCustomers] = useState(null);

  const register = async () => {
    const res = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    alert(data.message);
  };

  const login = async () => {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
    });

    const data = await res.json();

    if (data.message === "Login successful") {
      setLoggedIn(true);
      setLoggedInUserId(data.user_id);
    } else {
      alert(data.message);
    }
  };

  const applyLoan = async () => {
    const payload = {
      user_id: loggedInUserId,
      ...loanData,
      monthly_income: parseFloat(loanData.monthly_income),
      existing_emi: parseFloat(loanData.existing_emi),
      credit_score: parseFloat(loanData.credit_score),
      employment_years: parseFloat(loanData.employment_years),
      relationship_years: parseFloat(loanData.relationship_years),
      avg_bank_balance: parseFloat(loanData.avg_bank_balance),
      collateral_value: parseFloat(loanData.collateral_value),
      fraud_risk_score: parseFloat(loanData.fraud_risk_score),
      bank_policy_multiplier: parseFloat(
        loanData.bank_policy_multiplier
      ),
    };

    const res = await fetch(`${API_BASE}/apply-loan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setResult(data);

    const explainRes = await fetch(
      `${API_BASE}/explain/loan-approval`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const explainData = await explainRes.json();
    setExplanation(explainData);
  };

  const loadRMDashboard = async () => {
    const res = await fetch(`${API_BASE}/rm/dashboard`);
    const data = await res.json();
    setRmData(data);
  };

  const loadHistory = async () => {
    const res = await fetch(
      `${API_BASE}/history/${loggedInUserId}`
    );
    const data = await res.json();
    setHistoryData(data);
  };

  const loadRMCustomers = async () => {
    const res = await fetch(`${API_BASE}/rm/customers/`);
    const data = await res.json();
    setRmCustomers(data);
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-slate-900 p-8 rounded-3xl shadow-2xl border border-slate-800">
          <h1 className="text-3xl font-bold text-white text-center mb-8">
            Loan CRM AI
          </h1>

          {!isLogin && (
            <input
              placeholder="Name"
              className="w-full mb-4 p-4 rounded-xl bg-slate-800 text-white"
              onChange={(e) =>
                setUserData({
                  ...userData,
                  name: e.target.value,
                })
              }
            />
          )}

          <input
            placeholder="Email"
            className="w-full mb-4 p-4 rounded-xl bg-slate-800 text-white"
            onChange={(e) =>
              setUserData({
                ...userData,
                email: e.target.value,
              })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-4 rounded-xl bg-slate-800 text-white"
            onChange={(e) =>
              setUserData({
                ...userData,
                password: e.target.value,
              })
            }
          />

          <button
            onClick={isLogin ? login : register}
            className="w-full py-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-500 transition"
          >
            {isLogin ? "Login" : "Register"}
          </button>

          <button
            onClick={() => setIsLogin(!isLogin)}
            className="w-full mt-4 text-slate-400"
          >
            {isLogin
              ? "Create an account"
              : "Already have an account?"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Loan Intelligence Dashboard
          </h1>
          <p className="text-slate-400">
            AI-powered lending platform
          </p>
        </div>

        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl">
          <h2 className="text-2xl font-semibold mb-6">
            Apply for Loan
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {Object.keys(loanData).map((field) => (
              <input
                key={field}
                placeholder={field}
                className="p-4 rounded-xl bg-slate-800"
                onChange={(e) =>
                  setLoanData({
                    ...loanData,
                    [field]: e.target.value,
                  })
                }
              />
            ))}
          </div>

          <button
            onClick={applyLoan}
            className="mt-6 w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500"
          >
            Submit Application
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <button
            onClick={loadRMDashboard}
            className="p-4 rounded-xl bg-blue-600"
          >
            RM Dashboard
          </button>

          <button
            onClick={loadHistory}
            className="p-4 rounded-xl bg-purple-600"
          >
            Loan History
          </button>

          <button
            onClick={loadRMCustomers}
            className="p-4 rounded-xl bg-orange-600"
          >
            RM Customers
          </button>
        </div>

        {result && (
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-slate-900 p-6 rounded-3xl">
              <h3 className="text-slate-400">
                Approval Status
              </h3>
              <p className="text-2xl font-bold mt-2">
                {result.approval_prediction === 1
                  ? "Approved"
                  : "Rejected"}
              </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-3xl">
              <h3 className="text-slate-400">
                Fraud Risk
              </h3>
              <p className="text-2xl font-bold mt-2">
                {result.fraud_prediction === 1
                  ? "High"
                  : "Low"}
              </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-3xl">
              <h3 className="text-slate-400">
                Recommended Loan
              </h3>
              <p className="text-2xl font-bold mt-2">
                ₹
                {Math.round(
                  result.recommended_loan_amount
                )}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;