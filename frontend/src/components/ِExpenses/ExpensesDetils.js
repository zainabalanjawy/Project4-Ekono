import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom'
import { useParams, useHistory } from 'react-router';

import {BrowserRouter as Router,Navigate, Route , Routes,useNavigate} from 'react-router-dom'


export default function ExpenseDetails () {
    const navigate = useNavigate();
    const {state} = useLocation()
    const {exp} = state
    console.log(state);

    const deleteHandler = async (id) => {
        try {
          const response = await axios.delete(
            `http://127.0.0.1:8000/api/Expenses/${id}/Delete/`
          )
          console.log("deleted successfully!")
          navigate('/Expenses/ListExpenses')
        } catch (error) {
          console.log("Something went wrong", error)
        }
      }
  
    return (
    <>
          <div class="col-lg-4 col-md-8">
          <div class="card">
            <div class="card-body">
              <div class="author">
                <div class="name">
                  <span>PlaceName: {exp.PlaceName}</span>
                  <div class="stats">
                  </div>
                </div>
              </div>
              <p class="mt-4">Catogries: { exp.Catogries }</p>
              <p class="mt-4">Amount: { exp.Amount }</p>
              <button type="button" class="btn bg-gradient-primary btn-lg" onClick={() => deleteHandler(exp.id)}>Delete</button>
              <button type="button" class="btn bg-gradient-primary btn-lg" onClick={() => navigate('/Expenses/Edit',{state: {exp}})}>Edit</button>
            </div>
          </div>
          <br></br>
        </div>
        
    </>
    )

}