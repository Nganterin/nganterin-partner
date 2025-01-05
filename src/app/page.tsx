"use client";

import { Hero } from "@/components/Hero";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";

export default function Home() {
  return (
    <>
      <nav className="fixed top-0 w-screen">
        <div className="flex flex-row px-8 py-4 items-center justify-between w-full max-w-5xl mx-auto">
          <Image
            src={`/logo/logo-with-text-sky.png`}
            width={180}
            height={100}
            alt="logo"
          />
          <Button
            variant="flat"
            as={Link}
            href="/auth/login"
            radius="full"
            className="text-white bg-gradient-to-r from-sky-500 to-sky-700"
          >
            Sign In <GoArrowUpRight size={18} />
          </Button>
        </div>
      </nav>
      <Hero />
    </>
  );
}
