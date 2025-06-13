
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen animated-bg">
      <Navbar />
      <main className="flex-grow relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-indigo-50/50 pointer-events-none" />
        <div className="relative z-10">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
