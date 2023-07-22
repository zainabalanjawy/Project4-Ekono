import { BrowserRouter as Router, Routes, Route, Link,useNavigate, Navigate } from 'react-router-dom'
import CreateRecipet from './Recipet/Create'
import ViewAllRecipet from './Recipet/ViewAll'
import ViewRecipet from './Recipet/View'
import Signin from './components/auth/Signin'
import Signup from './components/auth/Signup'
import Profile from './components/auth/Profile'
import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';

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
          return <Navigate to='/'/>
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
      <Router>
        <nav>
          <div>
            <Link to='/signin'>Sign In</Link><br/>
            <Link to='/signup'>Sign Up</Link><br/>
            <Link to='/profile'>Profile</Link><br/>
            <Link to='/logout' onClick={logoutHandler}>Log Out</Link><br/>
            <Link to="/CreateRecipet">Create Recipet</Link> <br/>
            <Link to="/ViewAllRecipet">View All Recipet</Link> <br/>
          </div>
        </nav>
        <Routes>
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
            element={isAuth ? <Profile user={user} /> : <Signin login={loginHandler} />}
          />
          <Route path="/CreateRecipet" element={<CreateRecipet ></CreateRecipet>}/>
          <Route path="/ViewAllRecipet" element={<ViewAllRecipet></ViewAllRecipet>}/>
          <Route path="/ViewRecipet" element={<ViewRecipet></ViewRecipet>}/>
        </Routes>
      </Router>
    </>
  );
}
