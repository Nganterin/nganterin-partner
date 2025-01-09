"use client";

import { BASE_API } from "@/utilities/environment";
import fetchWithAuth from "@/utilities/fetchWithAuth";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BaseContainer } from "../BaseContainer";

interface FinanceDataType {
  total_order: number;
  total_reservation: number;
  total_income: number;
  total_income_alt: string;
  last_month_data: {
    total_order: number;
    total_reservation: number;
    total_income: number;
    total_income_alt: string;
  };
}

export const OrderAnalytic = () => {
  const [financeData, setFinanceData] = useState<FinanceDataType>();

  const fetchData = async () => {
    try {
      const res = await fetchWithAuth(
        BASE_API + "/partner/analytic/order/yearly",
        {
          method: "GET",
        }
      );

      const data = await res.json();
      if (res.ok) {
        setFinanceData(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Connection failed");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full flex flex-wrap gap-4">
      <BaseContainer title="Finance Information" description="Comprehensive hotel income overview">
        <div className="w-max mx-auto">
          <div className="flex flex-row gap-4 sm:gap-8">
            <div>
              <h3 className="text-center text-xl sm:text-3xl font-semibold">
                {financeData?.last_month_data.total_income_alt}
              </h3>
              <p className="text-center text-xs opacity-80">Past Month</p>
            </div>
            <div className="h-auto w-[1px] bg-gradient-to-b from-transparent via-sky-600 to-transparent"></div>
            <div>
              <h3 className="text-center text-xl sm:text-3xl font-semibold">
                {financeData?.total_income_alt}
              </h3>
              <p className="text-center text-xs opacity-80">Past Year</p>
            </div>
          </div>
          <div className="h-[1px] w-auto bg-gradient-to-r from-transparent via-sky-600 to-transparent mt-2 mb-1"></div>
          <p className="text-center font-semibold text-sm opacity-90">Income</p>
        </div>
      </BaseContainer>
      <BaseContainer title="Reservation Information" description="Reservations made at your hotels">
        <div className="w-max mx-auto">
          <div className="flex flex-row gap-8">
            <div>
              <h3 className="text-center text-3xl font-semibold">
                {financeData?.last_month_data.total_reservation}
              </h3>
              <p className="text-center text-xs opacity-80">Past Month</p>
            </div>
            <div className="h-auto w-[1px] bg-gradient-to-b from-transparent via-sky-600 to-transparent"></div>
            <div>
              <h3 className="text-center text-3xl font-semibold">
                {financeData?.total_reservation}
              </h3>
              <p className="text-center text-xs opacity-80">Past Year</p>
            </div>
          </div>
          <div className="h-[1px] w-auto bg-gradient-to-r from-transparent via-sky-600 to-transparent mt-2 mb-1"></div>
          <p className="text-center font-semibold text-sm opacity-90">
            Reservation
          </p>
        </div>
      </BaseContainer>
    </div>
  );
};
