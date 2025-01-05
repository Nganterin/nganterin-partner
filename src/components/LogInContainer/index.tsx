'use client'

import { cn } from "@/lib/utils"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useState } from "react";
import { Spinner } from "@nextui-org/react";
import Link from "next/link";
import { BASE_API } from "@/utilities/environment";

export const LogInContainer = () => {
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        const formData = new FormData(e.target)

        const inputData = {
            email: formData.get("email"),
            password: formData.get("password"),
        };

        if (!formValidation(inputData)) return;

        try {
            setIsLoading(true)
            const res = await fetch(BASE_API + "/partner/auth/login", {
                method: "POST",
                body: JSON.stringify(inputData),
                headers: {
                    "Content-Type": "application/json",
                },
                cache: "no-store",
            })

            if (res.ok) {
                toast.success("Login success")
            } else {
                const data = await res.json()
                toast.error(data.message)
            }
        } catch (err: any) {
            console.error(err)
            toast.error("Connection failed")
        } finally {
            setIsLoading(false)
        }
    }

    const formValidation = (data: any) => {
        const { email, password } = data;

        if (!email || !password) {
            toast.error("All fields are required!");
            return false;
        }

        if (password.length < 8) {
            toast.error("Password must be at least 8 characters!");
            return false;
        }

        return true;
    };

    return (
        (<div
            className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 text-slate-900 bg-transparent">
            <h2 className="font-bold text-xl text-slate-900 ">
                Log In to Nganterin Partner
            </h2>
            <p className="text-neutral-600 text-sm max-w-sm mt-2">
                While our login feature is still in the works, you can login now and start exploring the possibilities with Nganterin.
            </p>
            <form className="my-8" onSubmit={handleSubmit}>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">Manager Email Address</Label>
                    <Input id="email" name="email" placeholder="projectmayhem@fc.com" type="email" />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" placeholder="••••••••" type="password" />
                    <p className="text-xs">*Password must be at least 8 characters</p>
                </LabelInputContainer>

                <button
                    className="bg-gradient-to-br relative flex flex-row gap-2 justify-center items-center group/btn from-sky-500 to-sky-700 text-white w-full rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
                    disabled={isLoading}

                >
                    <Spinner color="white" size="sm" className={isLoading ? "" : "hidden"} />
                    Log In &rarr;
                    <BottomGradient />
                </button>
                <Link href={`/auth/register`} >
                    <p className="text-sm hover:underline my-2">
                        Doesn't have an account?
                        <span className="font-semibold">
                            {` `}Register here
                        </span>
                        !
                    </p>
                </Link>
                <div
                    className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
            </form>
        </div>)
    );
}

const BottomGradient = () => {
    return (<>
        <span
            className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <span
            className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>);
};

const LabelInputContainer = ({
    children,
    className
}: Readonly<{
    children: React.ReactNode;
    className: string;
  }>) => {
    return (
        (<div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>)
    );
};