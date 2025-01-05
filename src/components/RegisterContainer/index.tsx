"use client";

import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useState } from "react";
import { Spinner, Textarea } from "@nextui-org/react";
import Link from "next/link";
import { BASE_API } from "@/utilities/environment";
import { FilePond } from "react-filepond";

import "filepond/dist/filepond.min.css";
import { FilePondFile } from "filepond";
import { useRouter } from "next/navigation";

interface UploadedFile {
  status: number;
  message: string;
  data: {
    id: string;
    public_url: string;
    original_file_name: string;
    size: string;
  };
}

interface CompanyFormData {
  company_name: FormDataEntryValue | null;
  owner: FormDataEntryValue | null;
  company_field: FormDataEntryValue | null;
  company_email: FormDataEntryValue | null;
  company_address: FormDataEntryValue | null;
  name: FormDataEntryValue | null;
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
  confirmation_password: FormDataEntryValue | null;
  legality_file: String | null;
  mou_file: String | null;
}

const validationRules = {
  company_name: {
    pattern: /^[a-zA-Z0-9\s.,&'-]{2,100}$/,
    message:
      "Company name must be between 2-100 characters and can contain letters, numbers, spaces, and basic punctuation",
  },
  owner: {
    pattern: /^[a-zA-Z\s]{2,50}$/,
    message:
      "Owner name must be between 2-50 characters and can only contain letters and spaces",
  },
  company_field: {
    pattern: /^[a-zA-Z\s&,]{2,50}$/,
    message: "Company field must be between 2-50 characters",
  },
  company_email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Please enter a valid company email address",
  },
  company_address: {
    pattern: /^.{10,200}$/,
    message: "Company address must be between 10-200 characters",
  },
  name: {
    pattern: /^[a-zA-Z\s]{2,50}$/,
    message:
      "Name must be between 2-50 characters and can only contain letters and spaces",
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Please enter a valid email address",
  },
  password: {
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/,
    message:
      "Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, and one number",
  },
};

export const formValidation = (data: CompanyFormData): boolean => {
  const missingFields: string[] = [];
  const invalidFields: string[] = [];
  const fieldErrors: { [key: string]: string } = {};

  for (const [field, value] of Object.entries(data)) {
    if (field === "legality_file" || field === "mou_file") {
      if (!value) {
        missingFields.push(field.replace("_", " "));
      }
      continue;
    }

    if (!value) {
      missingFields.push(field.replace("_", " "));
    } else if (validationRules[field as keyof typeof validationRules]) {
      const rule = validationRules[field as keyof typeof validationRules];
      if (!rule.pattern.test(value as string)) {
        invalidFields.push(field.replace("_", " "));
        fieldErrors[field] = rule.message;
      }
    }
  }

  if (data.password && data.confirmation_password) {
    if (data.password !== data.confirmation_password) {
      invalidFields.push("confirmation password");
      fieldErrors["confirmation_password"] = "Passwords do not match";
    }
  }

  if (missingFields.length > 0) {
    toast.error(`Required fields missing: ${missingFields.join(", ")}`);
    return false;
  }

  if (invalidFields.length > 0) {
    for (const [field, message] of Object.entries(fieldErrors)) {
      toast.error(message);
    }
    return false;
  }

  return true;
};

export const RegisterContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [legalityBuffer, setLegalityBuffer] = useState<File[]>([]);
  const [legalityFile, setLegalityFile] = useState<String>("");
  const [mouBuffer, setMouBuffer] = useState<File[]>([]);
  const [mouFile, setMouFile] = useState<String>("");

  const router = useRouter()

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const inputData = {
      company_name: formData.get("company_name"),
      owner: formData.get("owner"),
      company_field: formData.get("company_field"),
      company_email: formData.get("company_email"),
      company_address: formData.get("company_address"),
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmation_password: formData.get("confirmation_password"),
      legality_file: legalityFile,
      mou_file: mouFile,
    };

    if (!formValidation(inputData)) return;

    try {
      setIsLoading(true);
      const res = await fetch(BASE_API + "/partner/auth/register", {
        method: "POST",
        body: JSON.stringify(inputData),
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (res.ok) {
        toast.success("Register success, check email for verification");
        router.push("/auth/login")
      } else {
        const data = await res.json();
        toast.error(data.message);
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Connection failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 text-slate-900 bg-transparent">
      <h2 className="font-bold text-xl text-slate-900 ">
        Partner with Nganterin
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2">
        While our login feature is still in the works, you can register now and
        start exploring the possibilities with Nganterin.
      </p>
      <form className="mb-8" onSubmit={handleSubmit}>
        <div className="flex flex-row gap-4 mt-8">
          <div className="">
            <p className="my-2 text-xs uppercase opacity-50 font-semibold pb-2">
              Company Data
            </p>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="company_name">Company Name</Label>
              <Input
                id="company_name"
                name="company_name"
                placeholder="PT. Nganterin Kemana Aja"
                type="company_name"
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="owner">Company Owner</Label>
              <Input
                id="owner"
                name="owner"
                placeholder="Fahry Salamanca"
                type="owner"
              />
              <p></p>
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="company_field">Company Field</Label>
              <Input
                id="company_field"
                name="company_field"
                placeholder="Tourism"
                type="company_field"
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="company_email">Company Email</Label>
              <Input
                id="company_email"
                name="company_email"
                placeholder="contact@nganterin.web.id"
                type="company_email"
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="company_address">Company Address</Label>
              <Textarea
                id="company_address"
                name="company_address"
                placeholder="2891 Salamon Dr, Piere Mount, MX 18872"
                type="company_address"
                variant="bordered"
                radius="sm"
                className=""
                classNames={{
                  inputWrapper: [
                    "border-1",
                    "border-slate-200",
                    "bg-slate-50",
                    "group-hover:border-transparent",
                    "focus:border-transparent",
                    "focus:border-slate-50",
                    "transition-all",
                    "duration-200",
                  ],
                  input: [
                    "placeholder:opacity-60"
                  ]
                }}
              />
            </LabelInputContainer>
          </div>
          <div className="h-auto w-[1px] bg-gradient-to-b from-neutral-300 via-neutral-300 to-transparent"></div>
          <div className="">
            <p className="my-2 text-xs uppercase opacity-50 font-semibold pb-2">
              Account Manager Data
            </p>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="name">Manager Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="White Walter"
                type="name"
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Manager Email Address</Label>
              <Input
                id="email"
                name="email"
                placeholder="projectmayhem@fc.com"
                type="email"
              />
              <p className="text-xs">
                *Manager email will be used for verification
              </p>
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                placeholder="••••••••"
                type="password"
              />
              <p className="text-xs">*Password must be at least 8 characters</p>
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Confirmation Password</Label>
              <Input
                id="confirmation_password"
                name="confirmation_password"
                placeholder="••••••••"
                type="password"
              />
              <p className="text-xs">*Password must be match</p>
            </LabelInputContainer>
          </div>
        </div>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 to-transparent my-4 h-[1px] w-full" />
        <div>
          <p className="mb-1">Legality File</p>
          <FilePond
            files={legalityBuffer}
            onupdatefiles={(fileItems: FilePondFile[]) => {
              setLegalityBuffer(
                fileItems.map((fileItem) => fileItem.file as File)
              );
            }}
            onprocessfiles={() => {
              toast.success("File have been processed");
            }}
            credits={false}
            allowMultiple={false}
            allowRevert={false}
            acceptedFileTypes={[
              "application/pdf",
              "application/msword",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ]}
            name="file"
            required
            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            server={{
              process: {
                url: `${BASE_API}/files/upload`,
                onload: (response: any): string => {
                  try {
                    const data: UploadedFile = JSON.parse(response);
                    setLegalityFile(data.data.public_url);
                    return response;
                  } catch (error) {
                    console.error("Error parsing response:", error);
                    return "Error processing upload response";
                  }
                },
                onerror: (error: any): void => {
                  console.error("Upload error:", error);
                },
              },
              revert: null,
              restore: null,
              load: null,
              fetch: null,
            }}
          />
        </div>
        <div>
          <p className="mb-1">MOU File</p>
          <FilePond
            files={mouBuffer}
            onupdatefiles={(fileItems: FilePondFile[]) => {
              setMouBuffer(fileItems.map((fileItem) => fileItem.file as File));
            }}
            onprocessfiles={() => {
              toast.success("File have been processed");
            }}
            credits={false}
            allowMultiple={false}
            allowRevert={false}
            acceptedFileTypes={[
              "application/pdf",
              "application/msword",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ]}
            name="file"
            required
            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            server={{
              process: {
                url: `${BASE_API}/files/upload`,
                onload: (response: any): string => {
                  try {
                    const data: UploadedFile = JSON.parse(response);
                    setMouFile(data.data.public_url);
                    return response;
                  } catch (error) {
                    console.error("Error parsing response:", error);
                    return "Error processing upload response";
                  }
                },
                onerror: (error: any): void => {
                  console.error("Upload error:", error);
                },
              },
              revert: null,
              restore: null,
              load: null,
              fetch: null,
            }}
          />
        </div>
        <button
          className="bg-gradient-to-br relative flex flex-row gap-2 justify-center items-center group/btn from-sky-500 to-sky-700 text-white w-full rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] my-6"
          type="submit"
          disabled={isLoading}
        >
          <Spinner
            color="white"
            size="sm"
            className={isLoading ? "" : "hidden"}
          />
          Register &rarr;
          <BottomGradient />
        </button>
        <Link href={`/auth/login`}>
          <p className="text-sm hover:underline my-2">
            Already have an account?
            <span className="font-semibold">{` `}Sign In here</span>!
          </p>
        </Link>
      </form>
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className: string;
}>) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
