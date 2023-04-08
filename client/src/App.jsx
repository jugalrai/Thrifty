import "./App.css";
import { Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/Register";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import Account from "./pages/Account";
import ProductPages from "./pages/ProductPages";
import ProductFormPages from "./pages/ProductFormPages";
import ProductPage from "./pages/ProductPage";
import BookingsPage from "./pages/BookingsPage";

axios.defaults.baseURL = `http://localhost:5001`;
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/product" element={<ProductPages />} />
          <Route path="/account/product/new" element={<ProductFormPages />} />
          <Route path="/account/product/:id" element={<ProductFormPages />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
