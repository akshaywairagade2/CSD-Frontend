import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/HomePage/home';
import Login from './Authentication/Login';
import SignUp from './Authentication/Signup';
import ResetPassword from './Authentication/Resetpassword';
import Verified from "./Authentication/Verified"
import VerifiedMail from './Authentication/VerifyMail';
import Buyer from './pages/Buyer/buyer';
import Sender from './pages/Sender/sender';
import Catalog from './pages/Catalogs/catalog';
import AddItem from './pages/AddItem/additem';
import AddToCart from './pages/AddtoCart/addtocart';
import Payment from './pages/Payment/payment';
import HotelItems from './pages/HotelItems/hotelitems';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
        <Route path="/verify/:id" element={<Verified />} />
        <Route path="/verifymail" element={<VerifiedMail />} />
        <Route path="/sender" element={<Sender />} />
        <Route path="/buyer" element={<Buyer />} />
        <Route path="/catalog/:id" element={<Catalog />} />
        <Route path="/additem" element={<AddItem />} />
        <Route path="/addtocart" element={<AddToCart />} />
        <Route path="/payment/:id" element={<Payment />} />
        <Route path="/items" element={<HotelItems />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
