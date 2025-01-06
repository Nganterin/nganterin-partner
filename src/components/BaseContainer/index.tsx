export const BaseContainer = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-full h-full bg-slate-50 rounded-lg py-2 px-4 shadow-lg shadow-sky-800/30">
      {children}
    </div>
  );
};
