import { DriftFeature } from "@/types/drift";

interface DriftCardProps {
  featureName: string;
  feature: DriftFeature;
}

export default function DriftCard({
  featureName,
  feature,
}: DriftCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
      <h3 className="font-semibold">
        {featureName}
      </h3>

      <p className="mt-2">
        Drift:
        {" "}
        {feature.drift_detected
          ? "Detected"
          : "Stable"}
      </p>

      <p>
        Score:
        {" "}
        {feature.drift_score}
      </p>

      <p>
        P-value:
        {" "}
        {feature.p_value}
      </p>
    </div>
  );
}