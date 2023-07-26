import React, { useEffect, useState, Component } from 'react'
import axios, { all } from 'axios';
import { useLocation } from 'react-router-dom'
// import { Container } from '@chakra-ui/react';
import {BrowserRouter as Router,Navigate, Route , Routes, Link ,useNavigate} from 'react-router-dom'

export default function View(props){
    
    const navigate = useNavigate();
    const {state} = useLocation()
    const {rec} = state
    console.log(state);

    const deleteHandler = async (id) => {
        try {
          const response = await axios.delete(
            `http://127.0.0.1:8000/api/Recipet/${id}/delete/`
          )
          console.log("deleted successfully!")
          navigate('/Recipet/ViewAll')
        } catch (error) {
          console.log("Something went wrong", error)
        }
      }
  
    return (
    <>
        <h1>Recipet Details</h1>
        <h4 >ID: {rec.id}</h4>
        <h4 >PlaceName: {rec.PlaceName}</h4>
        <h4 >Amount: {rec.Amount}</h4>
        <h4 >Categoty: {rec.Categoty}</h4>
        <h4 >Image: </h4>
        <img src={`${rec.Image}`}></img>
        {/* <img src={`../mediafiles/${rec.Image.slice(rec.Image.lastIndexOf('/') + 1)}`}></img> */}
        <button type="button" class="btn bg-gradient-primary btn-lg" onClick={() => deleteHandler(rec.id)}>Delete</button>&nbsp;&nbsp;&nbsp;
    </>
    )
}