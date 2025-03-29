
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Apply from "./pages/Apply";
import Process from "./pages/Process";
import SuccessPage from "./pages/SuccessPage";
import AboutUs from "./pages/AboutUs";
import Blog from "./pages/Blog";
import Findeks from "./pages/Findeks";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/basvuru" element={<Apply />} />
          <Route path="/surec" element={<Process />} />
          <Route path="/basvuru-basarili" element={<SuccessPage />} />
          <Route path="/biz-kimiz" element={<AboutUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/findeks" element={<Findeks />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
