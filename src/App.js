import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './pages/HomePage/homepage';
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} exact />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
