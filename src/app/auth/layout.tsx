const Layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-100 to-slate-50">
            {children}
        </div>
    )
  }

  export default Layout