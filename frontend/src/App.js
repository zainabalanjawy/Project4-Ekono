import { BrowserRouter as Router, Routes, Route, Link,useNavigate, Navigate } from 'react-router-dom'
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
import Dashboard from './components/dashboard/dashboard.js'
import LandingPage from "./views/examples/LandingPage";
import RegisterPage from "views/examples/RegisterPage.js";
import LoginPage from "views/examples/LoginPage";
import ProfilePage from "views/examples/ProfilePage.js";
import Index from "./views/Index"
import HomePage from "views//examples/HomePage.js"
import HomeNavbar from "./components/Navbars/HomeNavbar.js";

// import Home from './components/Home'
import Category from './components/Category/Create'
import axios from 'axios';
import { useState, useEffect } from 'react';
// import './App.css';
import ListCateogry from './components/Category/List';




export default function App() {
  const [isAuth, setIsAuth] = useState(false) //check if user is logged in or not
  const [user, setUser] = useState({}) //store user token
  
  useEffect(() => {
    let token = localStorage.getItem('token')
    if (token) {
      let user = token
        setIsAuth(true)
        setUser(user)
    }
    else if (!user) {
        localStorage.remove('token')
        setIsAuth(false)
      }
  }, [])
  const registerHandler = (user) => {
    axios.post('http://127.0.0.1:8000/auth/register/', user)
      .then(res => {
        console.log('registerhandler response: ', res)
        if(res.status == 204)
        window.location.pathname = '/login-page'
      }).catch(err => {
        console.log(err)
      })

  }

  const loginHandler = (credintials) => {
    axios.post('http://127.0.0.1:8000/auth/login/', credintials)
      .then(res => {
        console.log("user has logged in. Token: ", res.data.key)
        //store the token in our local storage
        let token = res.data.key
        if (token != null) {
          localStorage.setItem("token", token) //create a local storage with the name token
          let user = token
          // let response = axios.get(`http://127.0.0.1:8000/auth/${credintials['username']}/profile/`)
          setIsAuth(true)
          setUser(user)
          // event.preventDefault()
          window.location.pathname = '/home-page'
        }
      }).catch(err => {
        console.log(err.message)
      })
  }
  const logoutHandler = (e) => {
    console.log('logged in user was: ', user)
    e.preventDefault() //don't execute this code on page refersh
    localStorage.removeItem('token')
    setIsAuth(false)
    setUser(null)
    console.log('user logged out successfully. Token has been removed')
  }
  return (
    <>

        <nav>
          <div className='first-nav-div'>
            {/* <Link className='link-item' to='/'>Home</Link><br/> */}
            {/* <Link className='link-item' to="/CreateRecipet">Create Recipet</Link> <br/>
            <Link className='link-item' to="/ViewAllRecipet">View All Recipet</Link> <br/>
            <Link className='link-item' to="/Expenses/Create">Create Expense</Link>
            <Link className='link-item' to="/Expenses/List">List Expense</Link>
            <Link to="/Category/Create">Create Category</Link><br/>
            <Link to="/Category/List">List Category</Link><br/>
            <Link to='/signin'>Sign In</Link><br/>
            <Link to='/signup'>Sign Up</Link><br/>
            <Link to='/profile'>Profile</Link><br/>
           
            
            <Link className='link-item' to='/logout' onClick={logoutHandler}>Log Out</Link><br/> */}
          </div>

        </nav>
        <Routes>

     <Route path="/components" element={<Index />} />
      <Route path="/landing-page" element={<LandingPage />} />
      <Route path="/register-page" element={<RegisterPage register={registerHandler} />} />
       <Route path="/login-page" element={<LoginPage login={loginHandler} />} />
      <Route path="/profile-page" element={isAuth ? <ProfilePage /> : <LoginPage login={loginHandler}/>} />
      <Route path="/home-page" element={isAuth ? <HomePage />: <LoginPage login={loginHandler}/>} />
      <Route path="/dashboard" element={isAuth ?<Dashboard /> : <LoginPage login={loginHandler}/>} />
      <Route path="*" element={<Navigate to="/components" replace />} />
      <Route path="/logout" logout={logoutHandler} />

          <Route
            path='/signin'
            element={<Signin login={loginHandler}/>}
          />
          <Route
            path='/signup'
            element={<Signup register={registerHandler}/>}
          />
          <Route
            path='/profile'
            element={isAuth ? <Profile user={user} /> : <LoginPage login={loginHandler} />}
          />
          {/* <Route path="/" element={<Home/>}/> */}
          <Route path="/CreateRecipet" element={isAuth ? <CreateRecipet ></CreateRecipet>: <LoginPage login={loginHandler}/>}/>
          <Route path="/ViewAllRecipet"  element={isAuth ? <ViewAllRecipet user={user} /> : <LoginPage login={loginHandler} />}/>
          <Route path="/ViewRecipet" element={isAuth ? <ViewRecipet user={user} /> : <LoginPage login={loginHandler} />}/>
          <Route path='/Expenses/Create'element={isAuth ? <CreateExpense />: <LoginPage login={loginHandler}/>}  />
          <Route path='/Expenses/List'element={isAuth ? <ListExpenses />: <LoginPage login={loginHandler}/>}  />
          <Route path='/Expenses/Details'element={isAuth ? <ExpenseDetails />: <LoginPage login={loginHandler}/>} />
          <Route path='/Expenses/Edit'element={isAuth ? <EditExpense />: <LoginPage login={loginHandler}/>} />
          <Route path='/Category/Create'element={isAuth ? <Category />: <LoginPage login={loginHandler}/>}  />
          <Route path='/Category/List'element={isAuth ? <ListCateogry />: <LoginPage login={loginHandler}/>}  />
          {/* <Route path='/Category/Delete'element={<DeleteCateogry />}  /> */}
        </Routes>
    
    </>
  );
}
