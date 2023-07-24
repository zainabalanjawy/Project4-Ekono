import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap';
import {BrowserRouter as Router,Navigate, Route , Routes,useNavigate} from 'react-router-dom'


const ListExpenses = () => {
     const navigate = useNavigate();
        const token = localStorage.getItem("token")
        console.log('tokkkken',token);
        const [Expenses, setExpenses] = useState([])
        const fetchExpenses = async () => {
            const list = await axios.get('http://127.0.0.1:8000/api/Expenses/List/',{
              headers: {
                'Authorization': `Token ${token}`
              }
              })
            console.log(list.data)
            setExpenses(list.data)
        }
        useEffect(() => {
            fetchExpenses();
        }, [])

    const allExpense = Expenses.map((exp, index) => {
        return (
       
          <div class="col-lg-4 col-md-8">
          <div class="card">
            <div class="card-body">
              {/* <img src="../../assets/img/team-2.jpg" alt="..." class="avatar avatar-lg border-radius-lg shadow mt-n5"/> */}
              <div class="author">
                <div class="name">
                  <span>PlaceName: {exp.PlaceName}</span>
                  <div class="stats">
                    {/* <small><i class="far fa-clock"></i>Items: {exp.Items}</small> */}
                  </div>
                </div>
              </div>
              {/* <p class="mt-4">Catogries: { exp.Catogries }</p> */}
              <p class="mt-4">Amount: { exp.Amount }</p>
              <button type="button" class="btn bg-gradient-primary btn-lg" onClick={() => navigate('/Expenses/Details', {state: {exp}})}>Details</button>
              {/* <button type="button" class="btn bg-gradient-primary btn-lg" onClick={() => deleteExp(Expenses.id)}>Delete</button>
              <button type="button" class="btn bg-gradient-primary btn-lg">Edit</button> */}
            </div>
          </div>
          <br></br>
        </div>
        
      )
      })

    return (
    <container>
        <h1>All Expenses</h1>
        {allExpense}
    </container>
    )
}

export default ListExpenses;