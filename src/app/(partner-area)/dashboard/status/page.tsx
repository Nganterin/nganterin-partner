"use client";

import { ApprovalProgress } from "@/components/ApprovalProgress";
import { BaseContainer } from "@/components/BaseContainer";
import { BASE_API } from "@/utilities/environment";
import fetchWithAuth from "@/utilities/fetchWithAuth";
import { GetPartnerData } from "@/utilities/getPartnerData";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { LuRefreshCw } from "react-icons/lu";

const Page = () => {
  const [partnerData, setPartnerData] = useState<PartnerType>();
  const [lastTimeCheck, setLastTimeCheck] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const data = GetPartnerData();
    setPartnerData(data);
    updateLastTimeCheck();

    if (!data?.is_data_verified) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await fetchWithAuth(BASE_API + "/partner/approval/status", {
        method: "GET",
      });
      
      updateLastTimeCheck();
      if (res.ok) {
        const data = await res.json();
        Cookies.remove("partner_jwt");
        Cookies.set("partner_jwt", data.data);
        window.location.reload();
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Connection failed");
    } finally {
      setIsLoading(false);
    }
  };

  const updateLastTimeCheck = () => {
    const now = new Date();
    const nowString = now.toUTCString();

    setLastTimeCheck(nowString);
  };

  return (
    <div className="">
      <BaseContainer title="Approval Status">
        <div className="w-full space-y-6">
          <ApprovalProgress
            isVerified={partnerData ? partnerData.is_data_verified : false}
          />
          <div className="flex flex-row items-center justify-end gap-2">
            <button
              onClick={fetchData}
              className="flex flex-row gap-1 items-center justify-center text-xs px-2 py-1 rounded-md border hover:border-slate-300 hover:bg-slate-100 transition-all duration-200"
            >
              <LuRefreshCw
                size={14}
                className={isLoading ? "animate-spin" : ""}
              />{" "}
              Refresh
            </button>
            <p className="text-xs opacity-70">Last Check: {lastTimeCheck}</p>
          </div>
        </div>
      </BaseContainer>
    </div>
  );
};

export default Page;
