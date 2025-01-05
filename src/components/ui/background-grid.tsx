export const BackGroundGrid = ({
  children,
  boxSize,
}: Readonly<{
  children: React.ReactNode;
  boxSize: number;
}>) => {
  return (
    <div className="h-full w-full bg-gradient-to-b from-sky-100 to-slate-50">
      <div
        className="h-full w-full"
        style={{
          backgroundImage: `
            linear-gradient(to right, #80808012 1px, transparent 1px),
            linear-gradient(to bottom, #80808012 1px, transparent 1px)
            `,
          backgroundSize: `${boxSize}px ${boxSize}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
};
