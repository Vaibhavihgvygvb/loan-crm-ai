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
    try {
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

      if (data.user_id) {
        setLoggedIn(true);
        setLoggedInUserId(data.user_id);
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      alert("Login error");
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
    try {
      const res = await fetch(`${API_BASE}/rm/dashboard`);
      const data = await res.json();
      setRmData({ ...data });
    } catch (error) {
      console.error(error);
    }
  };

  const loadHistory = async () => {
    try {
      const res = await fetch(
        `${API_BASE}/history/${loggedInUserId}`
      );
      const data = await res.json();
      setHistoryData({ ...data });
    } catch (error) {
      console.error(error);
    }
  };

  const loadRMCustomers = async () => {
    try {
      const res = await fetch(`${API_BASE}/rm/customers/`);
      const data = await res.json();
      setRmCustomers({ ...data });
    } catch (error) {
      console.error(error);
    }
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-slate-900 p-8 rounded-3xl">
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
            className="w-full py-4 rounded-xl bg-blue-600 text-white"
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

        {rmData !== null && (
          <div className="bg-slate-900 p-8 rounded-3xl mt-8">
            <h2 className="text-xl font-bold mb-6">
              RM Dashboard
            </h2>

            <div className="grid md:grid-cols-4 gap-4">
              <div>Total: {rmData?.total_applications ?? 0}</div>
              <div>Approved: {rmData?.approved_loans ?? 0}</div>
              <div>Fraud: {rmData?.fraud_cases ?? 0}</div>
              <div>
                Avg: ₹
                {Math.round(
                  rmData?.average_recommended_loan ?? 0
                )}
              </div>
            </div>
          </div>
        )}

        {historyData?.applications && (
          <div className="bg-slate-900 p-8 rounded-3xl mt-8">
            <h2 className="text-xl font-bold mb-6">
              Loan History
            </h2>

            {historyData.applications.map((app) => (
              <div key={app.id} className="mb-2">
                Loan #{app.id} — ₹
                {Math.round(app.recommended_loan_amount)}
              </div>
            ))}
          </div>
        )}

        {rmCustomers?.customers && (
          <div className="bg-slate-900 p-8 rounded-3xl mt-8">
            <h2 className="text-xl font-bold mb-6">
              RM Customers
            </h2>

            {rmCustomers.customers.map((customer, index) => (
              <div key={index} className="mb-2">
                {customer.customer_name} — ₹
                {Math.round(
                  customer.recommended_loan_amount
                )}
              </div>
            ))}
          </div>
        )}

        {result && (
          <div className="mt-8">
            <p>Approval: {result.approval_prediction}</p>
            <p>Fraud: {result.fraud_prediction}</p>
            <p>
              Amount: ₹
              {Math.round(result.recommended_loan_amount)}
            </p>
          </div>
        )}

        {explanation?.feature_impact && (
          <div className="mt-8">
            <h2>Decision Explanation</h2>
            {Object.entries(
              explanation.feature_impact
            ).map(([key, value]) => (
              <div key={key}>
                {key}: {value}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;