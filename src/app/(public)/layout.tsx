"use client";

import { BackGroundGrid } from "@/components/ui/background-grid";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GoArrowLeft, GoArrowUpRight } from "react-icons/go";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();

  return (
    <BackGroundGrid boxSize={50}>
      <nav className="fixed top-0 w-screen">
        <div className="flex flex-row px-8 py-4 items-center justify-between w-full max-w-5xl mx-auto">
          <Image
            src={`/logo/logo-with-text-sky.png`}
            width={180}
            height={100}
            alt="logo"
          />
          {!pathname.includes("/auth") ? (
            <Button
              variant="flat"
              as={Link}
              href="/auth/login"
              radius="full"
              className="text-white bg-gradient-to-r from-sky-500 to-sky-700 shadow-lg shadow-sky-700/30"
            >
              Sign In <GoArrowUpRight size={18} />
            </Button>
          ) : (
            <Button
              variant="flat"
              as={Link}
              href="/"
              radius="full"
              className="text-white bg-gradient-to-r from-sky-500 to-sky-700 shadow-lg shadow-sky-700/30"
            >
              <GoArrowLeft size={18} /> Home
            </Button>
          )}
        </div>
      </nav>
      <div className="min-h-screen py-14">{children}</div>
    </BackGroundGrid>
  );
};

export default Layout;
