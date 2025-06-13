
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

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
      </div>
    </ThemeProvider>
  );
};

export default Layout;
