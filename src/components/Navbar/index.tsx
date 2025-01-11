"use client";

import { GetPartnerData } from "@/utilities/getPartnerData";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  IoIosInformationCircleOutline,
  IoIosList,
  IoIosLogIn,
  IoIosLogOut,
  IoIosTrendingUp,
} from "react-icons/io";
import { RiHotelLine } from "react-icons/ri";

export const Navbar = () => {
  const [partnerData, setPartnerData] = useState<PartnerType>();
  const pathname = usePathname();

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
      <div className="sm:hidden">
        <Dropdown>
          <DropdownTrigger>
            <RxHamburgerMenu className="cursor-pointer" size={20} />
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="analytics">
              <Button
              variant="light"
                as={Link}
                href="/dashboard"
                className={`flex justify-start w-full text-gray-800 hover:bg-slate-50 transition-all duration-400`}
                startContent={<IoIosTrendingUp size={22} />}
              >
                <p>Analytics</p>
              </Button>
            </DropdownItem>
            <DropdownItem key="hotels">
              <Button
              variant="light"
                as={Link}
                href="/dashboard/hotel"
                className={`flex justify-start w-full text-gray-800 hover:bg-slate-50 transition-all duration-400`}
                startContent={<RiHotelLine size={22} />}
              >
                <p>Hotels</p>
              </Button>
            </DropdownItem>
            <DropdownItem key="reservations">
              <Button
              variant="light"
                as={Link}
                href="/dashboard/reservation"
                className={`flex justify-start w-full text-gray-800 hover:bg-slate-50 transition-all duration-400`}
                startContent={<IoIosList size={22} />}
              >
                <p>Reservations</p>
              </Button>
            </DropdownItem>
            <DropdownItem key="checkin">
              <Button
              variant="light"
                as={Link}
                href="/dashboard/checkin"
                className={`flex justify-start w-full text-gray-800 hover:bg-slate-50 transition-all duration-400`}
                startContent={<IoIosLogIn size={22} />}
              >
                <p>Check In</p>
              </Button>
            </DropdownItem>
            <DropdownItem key="checkout">
              <Button
              variant="light"
                as={Link}
                href="/dashboard/checkout"
                className={`flex justify-start w-full text-gray-800 hover:bg-slate-50 transition-all duration-400`}
                startContent={<IoIosLogOut size={22} />}
              >
                <p>Check Out</p>
              </Button>
            </DropdownItem>
            <DropdownItem key="approval">
              <Button
              variant="light"
                as={Link}
                href="/dashboard/status"
                className={`flex justify-start w-full text-gray-800 hover:bg-slate-50 transition-all duration-400`}
                startContent={<IoIosInformationCircleOutline size={22} />}
              >
                <p>Approval Status</p>
              </Button>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="hidden sm:flex flex-row items-center justify-center gap-2">
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
