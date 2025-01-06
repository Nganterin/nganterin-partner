export const BaseContainer = ({
  children,
  title,
}: Readonly<{
  children: React.ReactNode;
  title: string;
}>) => {
  return (
    <div className="w-full h-full bg-slate-50 rounded-lg py-6 px-6 shadow-lg shadow-sky-800/30">
      <h1 className="text-slate-900/80 font-bold uppercase text-sm">{title}</h1>
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-300 to-transparent mt-2 mb-4"></div>
      {children}
    </div>
  );
};
