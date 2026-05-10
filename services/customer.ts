import { api } from "./api";
import { Customer } from "@/types/customer";

export const getCustomers = async (): Promise<
  Customer[]
> => {
  const response =
    await api.get<Customer[]>(
      "/rm/customers"
    );

  return response.data;
};