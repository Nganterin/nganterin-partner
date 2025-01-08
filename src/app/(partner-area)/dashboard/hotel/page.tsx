"use client";

import { HotelRegister } from "@/components/HotelRegister";

const Page = () => {
  return (
    <div className="">
      <div className="flex flex-row gap-4">
        <div className="w-1/2 h-max">
          <HotelRegister />
        </div>
        <div className="w-1/2 h-max space-y-4"></div>
      </div>
    </div>
  );
};

export default Page;
