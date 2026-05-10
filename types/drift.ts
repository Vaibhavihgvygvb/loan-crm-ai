export interface DriftFeature {
  drift_detected: boolean;
  drift_score: number;
  p_value: number;
}

export interface DriftResponse {
  drift_report: Record<string, DriftFeature>;
}