import { LogInContainer } from "@/components/LogInContainer";

const Page = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="rounded-lg bg-white shadow-lg shadow-sky-800/50 my-14">
        <LogInContainer />
      </div>
    </div>
  );
};

export default Page;
