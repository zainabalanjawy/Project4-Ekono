import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container } from '@chakra-ui/react';
import {BrowserRouter as Router,Navigate, Route , Routes, Link ,useNavigate} from 'react-router-dom'

export default function ViewAll(props){
    const [recipet, setRecipet] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllRecipets()
    }, [])
  
    const getAllRecipets = async () => {
      const token = localStorage.getItem("token")
      console.log('tokkkken',token);
        const response = await axios.get(`http://127.0.0.1:8000/api/Recipet/List/`,{
          headers: {
            'Authorization': `Token ${token}`
          } 
        })
        console.log(response)
        setRecipet(response.data)
    }

    const allRecipets = recipet.map((rec, index) => {
        return (
          <div class="col-lg-4 col-md-8">
          <div class="card" key={rec.id}>
            <div class="card-body">
              {/* <img src="../../assets/img/team-2.jpg" alt="..." class="avatar avatar-lg border-radius-lg shadow mt-n5"/> */}
              <div class="author">
                <div class="name">
                  <span>{rec.PlaceName}</span>
                  <div class="stats">
                    <small><i class="far fa-clock"></i> {rec.Categoty}</small>
                  </div>
                </div>
              </div>
              <p class="mt-4">Amount: { rec.Amount } BD</p>
              <button type="button" class="btn bg-gradient-primary btn-lg" onClick={() => navigate('/ViewRecipet', {state: {rec}})}>Details
              </button>
            </div>
          </div>
          <br></br>
        </div>
        
      )
      })

    return (
    <Container>
        <h1>All Recipets</h1>
        {allRecipets}
    </Container>
    )
}