
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import DebugAuth from "@/components/DebugAuth";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="visiondrill-ui-theme">
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        {/* Temporary debug component - remove in production */}
        {process.env.NODE_ENV === 'development' && <DebugAuth />}
      </div>
    </ThemeProvider>
  );
};

export default Layout;
