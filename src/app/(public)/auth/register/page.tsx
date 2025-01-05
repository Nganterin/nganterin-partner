import { RegisterContainer } from "@/components/RegisterContainer";

const Page = () => {
  return (
    <div className="w-full h-min-screen flex items-center justify-center">
      <div className="rounded-lg bg-white shadow-lg shadow-sky-800/50 my-14">
        <RegisterContainer />
      </div>
    </div>
  );
};

export default Page;
