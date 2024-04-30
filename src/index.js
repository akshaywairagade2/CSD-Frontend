import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from "@chakra-ui/react";
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { reducers } from "./redux/reducers"
import { thunk } from 'redux-thunk';
import { BrowserRouter } from "react-router-dom"
import { createStore, applyMiddleware, compose } from "redux"
import { GoogleOAuthProvider } from "@react-oauth/google"


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(thunk)))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider>
    <Provider store={store}>
      <GoogleOAuthProvider
        // clientId="798079972938-m4rquq9tk1q01mq6op742o1e87mm44tn.apps.googleusercontent.com">
        clientId="870910263745-4kn6i57s8p097mgq77c4peg0uk8g8p9f.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </ChakraProvider>
);


{/* <GoogleLogin
    clientId="870910263745-4kn6i57s8p097mgq77c4peg0uk8g8p9f.apps.googleusercontent.com"
    onSuccess={loginsuccess}
    onFailure={loginerror}
    cookiePolicy={'single_host_origin'}
    /> */}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
