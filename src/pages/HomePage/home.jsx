import react, { useState, useEffect } from "react"
import Header from "../../Header/Header";
import Footer from "../../Footer/footer";
import HomePageHotelOwner from "./homepageHotelowner";
import HomePageUser from "./homepageUser";

const Home = () => {

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const user = userInfo ? userInfo.User : null
    const role = 'user'


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

