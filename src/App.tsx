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
import BlogPost from "./pages/BlogPost"; // Import the new BlogPost component
import Findeks from "./pages/Findeks";
import KVKK from "./pages/KVKK";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import CreditCalculator from "./pages/CreditCalculator";

const queryClient = new QueryClient();

// ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

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
      <Route path="/blog/:slug" element={<BlogPost />} /> {/* Add route for blog post detail */}
      <Route path="/kredi-hesaplama" element={<CreditCalculator />} />
      <Route path="/findeks" element={<Findeks />} />
      <Route path="/kvkk" element={<KVKK />} />
      <Route path="/gizlilik-politikasi" element={<PrivacyPolicy />} />
      <Route path="/kullanim-kosullari" element={<TermsOfUse />} />
      <Route path="/giris" element={<Auth />} />
      {/* Add the auth callback route */}
      <Route path="/auth/callback" element={<Auth />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

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
