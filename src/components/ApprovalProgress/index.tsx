export const ApprovalProgress = ({
  isVerified,
}: Readonly<{ isVerified: boolean }>) => {
  const textColor = isVerified ? "text-sky-600" : "text-slate-800/80";
  const toColor = isVerified ? "to-sky-600" : "to-slate-800";

  return (
    <div className="w-full sm:w-max mx-auto">
      <div className="flex flex-row gap-3 items-center justify-center">
        <p className="text-sky-600 font-semibold text-sm sm:text-medium">Registered</p>
        <div
          className={`w-8 sm:w-16 h-[2px] bg-gradient-to-r from-transparent to-sky-600`}
        ></div>
        <p className={`${textColor} font-semibold text-sm sm:text-medium`}>Approved </p>
        <div
          className={`w-8 sm:w-16 h-[2px] bg-gradient-to-r from-transparent ${toColor}`}
        ></div>
        <p className={`${textColor} font-semibold text-sm sm:text-medium`}>Completed!</p>
      </div>
      <p className="text-center text-xs sm:text-sm text-slate-800/80 my-2">
        {isVerified
          ? "Info: Your data has been verified; let's start exploring now!"
          : "Info: Your data is still being processed; please hold on while we complete the verification!"}
      </p>
    </div>
  );
};
