'use client'

import Image from "next/image";

export const Navbar = () => {
  return (
    <nav className="w-full flex flex-row justify-between bg-slate-50 rounded-lg py-2 px-4 shadow-lg shadow-sky-800/30">
      <Image
        src={`/logo/logo-with-text-partner.png`}
        width={240}
        height={100}
        alt="logo"
      />
    </nav>
  );
};
