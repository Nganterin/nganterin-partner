import { BackGroundGrid } from "@/components/ui/background-grid";

const Layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    return (
      <BackGroundGrid boxSize={50}>
        <div className="min-h-screen">
            {children}
        </div>
      </BackGroundGrid>
    )
  }

  export default Layout