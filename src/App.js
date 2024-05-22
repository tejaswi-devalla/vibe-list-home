import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import Wishlist from "./components/Wishlist/Wishlist";
import Cart from "./components/Cart/Cart";
import NotFound from "./components/NotFound/NotFound";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { ProductProvider } from "./components/ProductDataContext/ProductDataContext";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/wishlist" element={<Wishlist />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route path="/not-found" element={<NotFound />} />

          <Route
            path="*"
            element={<Navigate to="/not-found" element={<NotFound />} />}
          />
        </Routes>
      </ProductProvider>
    </BrowserRouter>
  );
}

export default App;
