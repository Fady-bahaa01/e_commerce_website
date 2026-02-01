import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Mainlayout from "./Mainlayout";

import ProductDetails from "./pages/ProductDetails";
import Category from "./pages/Category";
import CheckoutPage from "./pages/CheckoutPage";

export default function App() {
  return (
    <div className="w-full h-dvh overflow-auto">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Mainlayout />}>
            <Route index element={<Homepage />} />
            <Route path="category/:id" element={<Category />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="*" element={<p>Erro 404 | page not found</p>} />
          </Route>
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
