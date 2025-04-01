
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Apply from "./pages/Apply";
import Process from "./pages/Process";
import SuccessPage from "./pages/SuccessPage";
import AboutUs from "./pages/AboutUs";
import Blog from "./pages/Blog";
import Findeks from "./pages/Findeks";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

// Create the QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false
    }
  }
});

// ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

// App Routes component
const AppRoutes = () => (
  <>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/basvuru" element={<Apply />} />
      <Route path="/surec" element={
        <ProtectedRoute>
          <Process />
        </ProtectedRoute>
      } />
      <Route path="/basvuru-basarili" element={<SuccessPage />} />
      <Route path="/biz-kimiz" element={<AboutUs />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/findeks" element={<Findeks />} />
      <Route path="/giris" element={<Auth />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

// Main App component
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
