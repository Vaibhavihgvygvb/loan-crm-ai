"use client";

import { getCustomers } from "@/services/customer";

export const useCustomer = () => {
  const fetchCustomers =
    async () => {
      const customers =
        await getCustomers();

      return customers;
    };

  return {
    fetchCustomers,
  };
};