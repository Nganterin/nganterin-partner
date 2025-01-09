"use client";

import { BASE_API } from "@/utilities/environment";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";

const LoadingState = () => (
  <div className="w-max mx-auto pt-[25vh]">
    <div>
      <h2 className="uppercase text-sky-600 text-5xl font-bold">loading</h2>
      <p>Verifying your verification token...</p>
    </div>
  </div>
);

const VerificationComponent = () => {
  const [status, setStatus] = useState<string>("loading");
  const [errorMessage, setErrorMessage] = useState<string>();
  const searchParams = useSearchParams();

  const statusMessage = {
    loading: "Verifying your verification token...",
    success: "Partner email verified! Please login to start explore!",
    error: "Something went wrong.",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = searchParams.get("token");
        const res = await fetch(
          BASE_API + `/partner/auth/verify?token=${token}`,
          {
            method: "POST",
            cache: "no-store",
          }
        );

        if (res.ok) {
          setStatus("success");
        } else {
          const data = await res.json();
          setErrorMessage(data.message);
          setStatus("error");
        }
      } catch (err) {
        console.error(err);
        toast.error("Connection error");
        setStatus("error");
        setErrorMessage("Connection error occurred");
      }
    };

    fetchData();
  }, [searchParams]);

  return (
    <div className="w-max mx-auto pt-[25vh]">
      <div>
        <h2 className="uppercase text-sky-600 text-5xl font-bold">
          {status !== "error" ? status : errorMessage}
        </h2>
        <p>{statusMessage[status as keyof typeof statusMessage]}</p>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<LoadingState />}>
      <VerificationComponent />
    </Suspense>
  );
};

export default Page;
