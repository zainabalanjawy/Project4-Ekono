import React, { Component, useState } from 'react'
import { useLocation, useParams} from 'react-router-dom'
import axios from 'axios'
import {BrowserRouter as Router,Navigate, Route , Routes, Link ,useNavigate} from 'react-router-dom'
export default function EditExpenses() {
    const {state} = useLocation()
    const {exp} = state
    const[Exp,setExp] = useState(state.exp)
    console.log(state);

    const handleChange = event => {
        const editExp = {...Exp}
        editExp[event.target.name] = event.target.value
        console.log(event.target.name + " ---- " + event.target.value)
        setExp(editExp)
    }


    const UpdateHandler = async (id) => {
        try {
          const response = await axios.put(
            `http://127.0.0.1:8000/api/Expenses/${id}/Update/`
          )
          console.log("Updated successfully!")
        //   navigate('/Expenses/ListExpenses')
        } catch (error) {
          console.log("Something went wrong", error)
        }
      }


  return (
    <>
    <h1>Edit Expenses</h1>
    <form>
        <lable>PlaceName: </lable>
        <input type='text'name="PlaceName" id="PlaceName" value={exp.PlaceName}  onChange={handleChange}></input>
        <input class="form-control"type="hidden" name="id" value={exp.id} onChange={handleChange} />

    </form>
    </>
  )
}
