"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosInformationCircleOutline, IoIosList, IoIosLogIn, IoIosLogOut, IoIosTrendingUp } from "react-icons/io";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { SlLogout } from "react-icons/sl";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { RiHotelLine } from "react-icons/ri";

export const Sidebar = () => {
  const [isCompact, setIsCompact] = useState(false);
  const pathname = usePathname()

  useEffect(() => {
    const lastCompactMode = Cookies.get("last_sidebar_compact");

    if (lastCompactMode == "true") {
      setIsCompact(true);
    }
  }, []);

  const handleLogOut = () => {
    Cookies.remove("partner_jwt");
    window.location.replace("/");
  };

  const handleCompactChange = () => {
    const compactMode = isCompact;

    setIsCompact(!compactMode);
    Cookies.set("last_sidebar_compact", (!compactMode).toString());
  };

  return (
    <div
      className={`${
        isCompact ? "w-20" : "w-60"
      } m-4 rounded-lg bg-gradient-to-br from-sky-400 to-sky-500 transition-all duration-300 p-4 space-y-3 hidden sm:flex flex-col justify-between shadow-lg shadow-sky-800/30`}
    >
      <div className="space-y-3">
        <Button onClick={handleCompactChange} isIconOnly variant="light">
          {isCompact ? (
            <MdKeyboardDoubleArrowRight color="white" size={26} />
          ) : (
            <MdKeyboardDoubleArrowLeft color="white" size={26} />
          )}
        </Button>
        <div className="h-4"></div>
        <Button
          as={Link}
          href="/dashboard"
          isIconOnly={isCompact}
          className={`${
            isCompact ? "" : "flex justify-start"
          } w-full text-gray-800 ${pathname.endsWith('/dashboard') ? "bg-slate-50" : "bg-slate-50/50"} hover:bg-slate-50 transition-all duration-400`}
          startContent={<IoIosTrendingUp size={22} />}
        >
          <p className={isCompact ? "hidden" : ""}>Analytics</p>
        </Button>
        <Button
          as={Link}
          href="/dashboard/hotel"
          isIconOnly={isCompact}
          className={`${
            isCompact ? "" : "flex justify-start"
          } w-full text-gray-800 ${pathname.endsWith('/dashboard/hotel') ? "bg-slate-50" : "bg-slate-50/50"} hover:bg-slate-50 transition-all duration-400`}
          startContent={<RiHotelLine size={22} />}
        >
          <p className={isCompact ? "hidden" : ""}>Hotels</p>
        </Button>
        <Button
          as={Link}
          href="/dashboard/reservation"
          isIconOnly={isCompact}
          className={`${
            isCompact ? "" : "flex justify-start"
          } w-full text-gray-800 ${pathname.endsWith('/dashboard/reservation') ? "bg-slate-50" : "bg-slate-50/50"} hover:bg-slate-50 transition-all duration-400`}
          startContent={<IoIosList size={22} />}
        >
          <p className={isCompact ? "hidden" : ""}>Reservations</p>
        </Button>
        <Button
          as={Link}
          href="/dashboard/checkin"
          isIconOnly={isCompact}
          className={`${
            isCompact ? "" : "flex justify-start"
          } w-full text-gray-800 ${pathname.endsWith('/dashboard/checkin') ? "bg-slate-50" : "bg-slate-50/50"} hover:bg-slate-50 transition-all duration-400`}
          startContent={<IoIosLogIn size={22} />}
        >
          <p className={isCompact ? "hidden" : ""}>Check In</p>
        </Button>
        <Button
          as={Link}
          href="/dashboard/checkout"
          isIconOnly={isCompact}
          className={`${
            isCompact ? "" : "flex justify-start"
          } w-full text-gray-800 ${pathname.endsWith('/dashboard/checkout') ? "bg-slate-50" : "bg-slate-50/50"} hover:bg-slate-50 transition-all duration-400`}
          startContent={<IoIosLogOut size={22} />}
        >
          <p className={isCompact ? "hidden" : ""}>Check Out</p>
        </Button>
        <Button
          as={Link}
          href="/dashboard/status"
          isIconOnly={isCompact}
          className={`${
            isCompact ? "" : "flex justify-start"
          } w-full text-gray-800 ${pathname.endsWith('/dashboard/status') ? "bg-slate-50" : "bg-slate-50/50"} hover:bg-slate-50 transition-all duration-400`}
          startContent={<IoIosInformationCircleOutline size={22} />}
        >
          <p className={isCompact ? "hidden" : ""}>Approval Status</p>
        </Button>
      </div>
      <div>
        <Button
          onPress={handleLogOut}
          isIconOnly={isCompact}
          className={`${
            isCompact ? "" : "flex justify-start"
          } w-full bg-slate-50 text-gray-800`}
        >
          <SlLogout size={18} color="#ef4444" />{" "}
          <p className={isCompact ? "hidden" : "text-red-500"}>Log Out</p>
        </Button>
      </div>
    </div>
  );
};
