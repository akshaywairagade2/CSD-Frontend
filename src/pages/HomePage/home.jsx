import react, { useState, useEffect } from "react"
import Header from "../../Header/Header";
import Footer from "../../Footer/footer";
import HomePageHotelOwner from "./homepageHotelowner";
import HomePageUser from "./homepageUser";
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const user = userInfo ? userInfo.User : null
    const role = 'hotelowner'
    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo) {
            navigate("/login")
        }
    })

    return (
        <>
            <>
                <Header />
                {
                    role == "hotelowner" && <HomePageHotelOwner />
                }
                {
                    role == "user" && <HomePageUser />
                }
                <Footer />
            </>
        </>
    )
}

export default Home;

