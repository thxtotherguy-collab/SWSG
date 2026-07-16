import "@/App.css";
import "@/index.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductPage from "./pages/ProductPage";
import PumpFinderPage from "./pages/PumpFinderPage";
import TankSizingPage from "./pages/TankSizingPage";
import ConsultationPage from "./pages/ConsultationPage";
import CartPage from "./pages/CartPage";
import AuthPage from "./pages/AuthPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import PumpsPage from "./pages/PumpsPage";
import IrrigationPage from "./pages/IrrigationPage";
import AgriculturePage from "./pages/AgriculturePage";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 pt-[calc(2rem+80px)]">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/pumps" element={<PumpsPage />} />
                <Route path="/irrigation" element={<IrrigationPage />} />
                <Route path="/agriculture" element={<AgriculturePage />} />
                <Route path="/store" element={<ShopPage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/pump-finder" element={<PumpFinderPage />} />
                <Route path="/tank-sizing" element={<TankSizingPage />} />
                <Route path="/consultation" element={<ConsultationPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/about" element={<AboutPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster position="bottom-right" />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
