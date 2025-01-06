"use client";

import { BaseContainer } from "@/components/BaseContainer";
import { HotelTable } from "@/components/HotelTable";
import { VisitorChart } from "@/components/VisitorChart";

const Page = () => {
  return (
    <div className="">
      <div className="flex flex-row gap-4">
        <div className="w-1/2">
          <VisitorChart />
        </div>
        <div className="w-1/2 h-max">
          <HotelTable />
        </div>
      </div>
    </div>
  );
};

export default Page;
