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
import Home from './components/Home'
import Category from './components/Category/Create'
import Dashboard from './components/user/Dashboard'
import response from "./components/user/data.json"
import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';
// import ListCateogry from './components/Category/List';



export default function App() {
  const [isAuth, setIsAuth] = useState(false) //check if user is logged in or not
  const [user, setUser] = useState({}) //store user token
  const [show, setShow] = useState(false);
  const [data, setData] = useState(false);  function dataHandler(e) {
    e.preventDefault()
    setData(response)
    console.log(response)
  }

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
      if(show){
        setData(response)
      }
  }, [show])
  const registerHandler = (user) => {
    axios.post('http://127.0.0.1:8000/auth/register/', user)
      .then(res => {
        console.log('registerhandler response: ', res)
        if(res.status == 204)
        window.location.pathname = '/signin'
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
          window.location.pathname = '/'
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
          <div className='first-nav-div'>
            <Link className='link-item' to='/'>Home</Link><br/>
            {/* <Link className='link-item' to="/CreateRecipet">Create Recipet</Link> <br/> */}
            {/* <Link className='link-item' to="/ViewAllRecipet">View All Recipet</Link> <br/> */}
            <Link className='link-item' to="/Expenses/Create">Create Expense</Link><br/>
            <Link className='link-item' to="/Expenses/List">List Expense</Link><br/>
            <Link to="/Category/Create">Create Category</Link><br/>
            <Link to="/Category/List">List Category</Link><br/>
            <Link className='link-item' to="/Dashboard">Dashboard</Link><br/>
            {/* <Link to="/Category/Delete">Delete </Link><br/> */}
            
          </div>
          <div className='second-nav-div'>
            <Link className='link-item' to='/signin'>Sign In</Link><br/>
            <Link className='link-item' to='/profile'>Profile</Link><br/>
            <Link className='link-item' to='/logout' onClick={logoutHandler}>Log Out</Link><br/>
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
          <Route path="/" element={<Home/>}/>
          <Route path="/CreateRecipet" element={<CreateRecipet ></CreateRecipet>}/>
          <Route path="/ViewAllRecipet"  element={isAuth ? <ViewAllRecipet user={user} /> : <Signin login={loginHandler} />}/>
          <Route path="/ViewRecipet" element={isAuth ? <ViewRecipet user={user} /> : <Signin login={loginHandler} />}/>
          <Route path='/Expenses/Create'element={<CreateExpense />}  />
          <Route path='/Expenses/List'element={<ListExpenses />}  />
          <Route path='/dashboard'element={<Dashboard />}  />
          <Route path='/Expenses/Details'element={<ExpenseDetails />} />
          <Route path='/Expenses/Edit'element={<EditExpense />} />
          <Route path='/Category/Create'element={<Category />}  />
          {/* <Route path='/Category/List'element={<ListCateogry />}  /> */}
          {/* <Route path='/Category/Delete'element={<DeleteCateogry />}  /> */}
        </Routes>
      </Router>
      <div className="App">
      { show ?
      <span>
      <h2>Available charts</h2>
      { show && data && data.charts.map((chartData, i) => (
        <Dashboard chart={chartData} key={i}/>
      ))}
      </span>
      : 
      <h2>No charts available </h2>
      }
      <button onClick={() => setShow(!show)}>
      { show ? "Hide data" : "Fetch data" }
      </button>
    </div>
    </>
  );
}
