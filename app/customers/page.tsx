"use client";

import { useEffect, useState } from "react";
import CustomerCard from "@/components/cards/CustomerCard";
import { useCustomer } from "@/hooks/useCustomer";

export default function CustomersPage() {
  const {
    fetchCustomers,
  } = useCustomer();

  const [customers, setCustomers] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadCustomers =
      async () => {
        try {
          const data =
            await fetchCustomers();

          setCustomers(
            data
          );
        } finally {
          setLoading(false);
        }
      };

    loadCustomers();
  }, [fetchCustomers]);

  if (loading) {
    return (
      <div>
        Loading customers...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Customers
        </h1>

        <p className="text-slate-500 mt-2">
          Customer relationship overview
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {customers.map(
          (customer) => (
            <CustomerCard
              key={
                customer.id
              }
              customer={
                customer
              }
            />
          )
        )}
      </div>
    </div>
  );
}