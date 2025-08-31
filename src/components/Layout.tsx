import { ReactNode } from "react";
import { Navigation } from "@/components/Navigation";
import { useAuth } from "@/hooks/useAuth";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navigation user={user} />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};