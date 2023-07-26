/*!

=========================================================
* BLK Design System React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss";
import "assets/demo/demo.css";

import Index from "views/Index.js";
import LandingPage from "views/examples/LandingPage.js";
import RegisterPage from "views/examples/RegisterPage.js";
import LoginPage from "views/examples/LoginPage";
import ProfilePage from "views/examples/ProfilePage.js";
import CreateRecipet from './components/Recipet/Create'
import ViewAllRecipet from './components/Recipet/ViewAll'
import ViewRecipet from './components/Recipet/View'
import Signin from './components/auth/Signin'
import Signup from './components/auth/Signup'
import Profile from './components/auth/Profile'
import CreateExpense from './components/ِExpenses/CreateExpenses'
import ListExpenses from './components/ِExpenses/ListExpenses';
import ExpenseDetails from './components/ِExpenses/ExpensesDetils'
import EditExpense from './components/ِExpenses/EditExpenses'
// import Home from './components/Home'
import Category from './components/Category/Create'
import App from './App'
import axios from 'axios';
import { useState, useEffect } from 'react';


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(

  <Router>
  <App/>
</Router>
  // <BrowserRouter>
  //   <Routes>
  //     <Route path="/components" element={<Index />} />
  //     <Route path="/landing-page" element={<LandingPage />} />
  //     <Route path="/register-page" element={<RegisterPage />} />
  //     <Route path="/login-page" element={<LoginPage />} />
  //     <Route path="/profile-page" element={<ProfilePage />} />
  //     <Route path="*" element={<Navigate to="/components" replace />} />
  //   </Routes>
  // </BrowserRouter>
);
