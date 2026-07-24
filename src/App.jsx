import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Mainlayout from "./Mainlayout";
import ProductDetails from "./pages/ProductDetails";
import Category from "./pages/Category";
import CheckoutPage from "./pages/CheckoutPage";
import Error404Page from "./pages/Error404Page";
import ScrollToTop from "./hooks/ScrollToTop";

export default function App() {
  return (
    <div className="w-full h-dvh ">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Mainlayout />}>
            <Route index element={<Homepage />} />
            <Route path="category/:id" element={<Category />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="*" element={<Error404Page />} />
          </Route>
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
