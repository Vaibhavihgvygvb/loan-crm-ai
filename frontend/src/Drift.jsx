import { useState } from "react";
import { toast } from "sonner";
import {
  Activity,
  ShieldCheck,
  ShieldAlert,
  Loader2,
  Play,
} from "lucide-react";
import { api } from "./api";

export default function Drift() {
  const [drift, setDrift] = useState(null);
  const [loading, setLoading] = useState(false);

  const runDriftCheck = async () => {
    setLoading(true);

    try {
      const data = await api("/drift/check", {
        method: "POST",
        body: JSON.stringify({
          monthly_income: 5000000,
          credit_score: 950,
          existing_emi: 250000,
        }),
      });

      setDrift(data);
      toast.success("Drift check complete");
    } catch (error) {
      toast.error("Drift check failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={runDriftCheck}>
        {loading ? "Running..." : "Run Drift Check"}
      </button>

      {drift ? (
        <pre>
          {JSON.stringify(drift, null, 2)}
         </pre>
      ) : (
        <p>No drift report yet</p>
      )}
    </div>
  );
}
