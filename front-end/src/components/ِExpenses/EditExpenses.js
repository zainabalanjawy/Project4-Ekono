import React, { Component, useState } from 'react'
import { useLocation, useParams} from 'react-router-dom'
import axios from 'axios'
import {BrowserRouter as Router,Navigate, Route , Routes, Link ,useNavigate} from 'react-router-dom'
export default function EditExpenses() {
    const {state} = useLocation()
    // const {exp} = state
    const [Expenses,setExpenses] = useState({})
    console.log("State ------ ",state);

    const handleChange = (e)=> {
      const att = e.target.name
      const val = e.target.value
      let currentExp = { ...Expenses}
      currentExp[att] = val
      setExpenses(currentExp)

    }


    const UpdateHandler = async (id) => {
        console.log("id: ", id)
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
        <input type='text'name="PlaceName" id="PlaceName" value= {Expenses.PlaceName} onChange={handleChange}></input>
        <input class="form-control"type="hidden" name="id" value={Expenses.id} onChange={handleChange} />

        <lable>Items: </lable>
        <input type='text'name="PlaceName" id="PlaceName" value= {Expenses.Items} onChange={handleChange}></input>

        {/* <lable>Catogries: </lable>
        <input type='text'name="PlaceName" id="PlaceName" value= {exp.Catogries} onChange={handleChange}></input> */}

        <lable>Amount: </lable>
        <input type='text'name="PlaceName" id="PlaceName" value= {Expenses.Amount} onChange={handleChange}></input>

        <button onClick={UpdateHandler}> Edit Expenses</button>
    </form>
    </>
  )
}
