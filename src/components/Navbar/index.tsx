"use client";

import { GetPartnerData } from "@/utilities/getPartnerData";
import Image from "next/image";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [partnerData, setPartnerData] = useState<PartnerType>();

  useEffect(() => {
    const data = GetPartnerData();
    setPartnerData(data);
  }, []);

  return (
    <nav className="w-full flex flex-row items-center justify-between bg-slate-50 rounded-lg py-2 px-6 shadow-lg shadow-sky-800/30">
      <Image
        src={`/logo/logo-with-text-partner.png`}
        width={240}
        height={100}
        alt="logo"
      />
      <div className="flex flex-row items-center justify-center gap-2">
        <div className="-space-y-1">
          <p className="text-right text-xl uppercase font-semibold bg-gradient-to-r from-sky-500 to-sky-700 bg-clip-text text-transparent">
            {partnerData ? partnerData.company_name : ""}
          </p>
          <p className="text-right text-xs opacity-70">
            {partnerData ? partnerData.email : ""}
          </p>
        </div>
        {partnerData &&
          (partnerData.is_data_verified ? (
            <Image
              src={`/icons/verified.png`}
              width={40}
              height={40}
              alt="verified icon"
            />
          ) : (
            ""
          ))}
      </div>
    </nav>
  );
};
