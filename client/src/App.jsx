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
import Search from "./Home/components/search";
import ProductFormPages from "./pages/ProductFormPages";
import ProductPage from "./pages/ProductPage";
import BookingsPage from "./pages/BookingsPage";
import AdminBookingList from "./pages/admin";
import Footer from "./layout/Footer";

axios.defaults.baseURL = `http://localhost:5001`;
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          {/* auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* user */}
          <Route path="/user" element={<Account />} />
          <Route path='/search' element={<Search />} />
          <Route path="/user/product" element={<ProductPages />} />
          <Route path="/user/product/new" element={<ProductFormPages />} />
          <Route path="/user/product/:id" element={<ProductFormPages />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/user/bookings" element={<BookingsPage />} />
          {/* admin */}
          <Route path="/admin" element={<AdminBookingList />} />
        </Route>
      </Routes>
      <Footer />
    </UserContextProvider>
  );
}

export default App;
