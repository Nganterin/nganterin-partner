"use client";

import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { BackGroundGrid } from "@/components/ui/background-grid";
import { withAuth } from "@/lib/withAuth";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <BackGroundGrid boxSize={50}>
      <div className="min-h-screen flex flex-row">
        <Sidebar />
        <div className="flex-grow max-h-screen overflow-auto p-4 space-y-4">
          <Navbar />
          {children}
        </div>
      </div>
    </BackGroundGrid>
  );
};

export default withAuth(Layout);
