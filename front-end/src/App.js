import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import CreateRecipet from './Recipet/Create'
import ViewAllRecipet from './Recipet/ViewAll'
import ViewRecipet from './Recipet/View'
import axios from 'axios';
import { useState, useEffect } from 'react';


// import jwt_decode from 'jwt-decode'

export default function App() {
  return (
    <>
      <h1>Ekono App</h1>
      <Router>
        <nav>
          <div>
            <Link to="/CreateRecipet">Create Recipet</Link> &nbsp;
            <Link to="/ViewAllRecipet">View All Recipet</Link> &nbsp;
          </div>
        </nav>
          <Routes>
          <Route path="/CreateRecipet" element={<CreateRecipet ></CreateRecipet>}/>
          <Route path="/ViewAllRecipet" element={<ViewAllRecipet></ViewAllRecipet>}/>
          <Route path="/ViewRecipet" element={<ViewRecipet></ViewRecipet>}/>
          </Routes>
      </Router>
      
    </>



  )
}