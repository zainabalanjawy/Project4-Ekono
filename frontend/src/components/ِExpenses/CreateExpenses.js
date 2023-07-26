import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link,useNavigate, Navigate } from 'react-router-dom'
  export default function CreateExpenses(){

    const[Category,setCategory] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
      fetchCategory()
  }, [])

  const fetchCategory = async () => {
    const token = localStorage.getItem("token")
    console.log('tokkkken',token);
      const response = await axios.get(`http://127.0.0.1:8000/api/category/list/`,{
        headers: {
          'Authorization': `Token ${token}`
        } 
      })
      console.log("response___", response)
      setCategory(response.data)
  }
  
    const [Expenses,setExpenses] = useState({})
    const changeHandler = (e)=>{
      const expenses = {...Expenses}
      expenses[e.target.name] = e.target.value
      console.log('Expenses', expenses)
      setExpenses(expenses)
    }

    const createHandler = (event) => {
      event.preventDefault()
      const token = localStorage.getItem("token")
      console.log('tokkkken',token);
      axios.post('http://127.0.0.1:8000/api/Expenses/Create/', Expenses ,{
          headers: {
            'Authorization': `Token ${token}`
          }
        })
      .then(res => {
        console.log('response: ', res)
      }).catch(err => {
        console.log(err)
      })
  }


  const category = Category.map((category, index) => {
    return(
      <>

        <option value={category.id}>{category.Category_name}</option>
    
      </>
     
    )

  })
  return (
    <>
        <h1> Create Expenses</h1>
        <form>
            <div>
                <label>Place Name</label>
                <input type='text'name="PlaceName" id="PlaceName" placeholder="PlaceName" onChange={changeHandler}></input>
            </div>
            <div>
                <label> Items </label>
                <input type='text' name="Items" id="Items" placeholder="Items" onChange={changeHandler}></input>
            </div>
            <div>
                <label> Categories </label>
                <select name='categories' onChange={changeHandler}>
                  {category}
                </select>
                {/* <input type='text' name="Categories" id="Categories" placeholder="Categories" onChange={changeHandler}></input> */}
            </div>
            <div>
                <label> Amount </label>
                <input type="Number" name="Amount" id="Amount" placeholder="Amount" onChange={changeHandler}></input>
            </div>
            <button onClick={createHandler}> Create Expenses</button>
        </form>
    </>
  
    
)

}