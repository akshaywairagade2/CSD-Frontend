import axios from "axios"
import env from "react-dotenv";



const API = axios.create({ baseURL: "https://iitbh-campus-delivery.onrender.com/" })

API.interceptors.request.use((req) => {
    if (localStorage.getItem("user_info")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("user_info").token)}`
    }

    return req;
})

export const signIn = (data) => API.post("/users/signin", data)
export const signInGoogle = (accessToken) => API.post("/users/signin", {
    googleAccessToken: accessToken
}, {
    headers: {
        "Content-type": "application/json",
    }
})

export const signUp = (data) => API.post("/users/signup", data)
export const signUpGoogle = (accessToken) => API.post("/users/signup", {
    googleAccessToken: accessToken
}, {
    headers: {
        "Content-type": "application/json",
    }
})