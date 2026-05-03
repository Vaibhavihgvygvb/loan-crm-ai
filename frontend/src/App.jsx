import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "sonner";

import {
  AuthProvider,
  ProtectedRoute,
} from "./auth";

import AppShell from "./AppShell";
import Login from "./Login";
import Dashboard from "./Dashboard";
import LoanApply from "./LoanApply";
import History from "./History";
import Customers from "./Customers";
import Audit from "./Audit";
import Forecast from "./Forecast";
import Drift from "./Drift";

function App() {
  return (
    <div className="App font-body">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AppShell />
                </ProtectedRoute>
              }
            >
              <Route
                index
                element={
                  <Navigate
                    to="/dashboard"
                    replace
                  />
                }
              />

              <Route
                path="dashboard"
                element={<Dashboard />}
              />

              <Route
                path="loan-apply"
                element={<LoanApply />}
              />

              <Route
                path="history"
                element={<History />}
              />

              <Route
                path="customers"
                element={<Customers />}
              />

              <Route
                path="audit"
                element={<Audit />}
              />

              <Route
                path="forecast"
                element={<Forecast />}
              />

              <Route
                path="drift"
                element={<Drift />}
              />
            </Route>

            <Route
              path="*"
              element={
                <Navigate to="/" replace />
              }
            />
          </Routes>
        </BrowserRouter>

        <Toaster position="top-right" />
      </AuthProvider>
    </div>
  );
}

export default App;