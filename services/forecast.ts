import { api } from "./api";
import { ForecastPoint } from "@/types/forecast";

export const getForecast = async (): Promise<
  ForecastPoint[]
> => {
  const response =
    await api.get<ForecastPoint[]>(
      "/forecast/loan-demand"
    );

  return response.data;
};