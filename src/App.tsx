import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Subjects from "./pages/Subjects";
import Quiz from "./pages/Quiz";
import Calendar from "./pages/Calendar";
import Calculator from "./pages/Calculator";
import AuthLogin from "./pages/auth/Login";
import AuthRegister from "./pages/auth/Register";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/auth/login" element={<AuthLogin />} />
              <Route path="/auth/register" element={<AuthRegister />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/subjects" element={<ProtectedRoute><Subjects /></ProtectedRoute>} />
              <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
              <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
              <Route path="/calculator" element={<ProtectedRoute><Calculator /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
