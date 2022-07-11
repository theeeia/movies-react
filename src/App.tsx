import React from "react";
import {Route, Routes } from "react-router-dom";
import Home from "./components/Home";

import SignIn from "./components/SignIn";
import "./scss/application.scss";



export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<SignIn type="login"/>}/>
        <Route path="/register" element={<SignIn type="register"/>}/>
      </Routes>
  
  );
}