import React, { useState } from "react";
import axios from 'axios';
//import Category from './components/Category/Create'
export default function Create(props) {
    //Set state for the user into new user
    const [newCatogery, setCatogery] = useState({});
    //Function to handle any change in value of fields
    const changeHandler = (e) => {
        //Set copy of newuser into user every time
        const catogery = { ...newCatogery }
        //Set key with value for fields sent in the form
        catogery[e.target.name] = e.target.value
        console.log('catogery', catogery)
        //Set user to new user
        setCatogery(catogery)
    }
    //Function to pass the new user after click
    const createHandler = (event) => {
        event.preventDefault()
        const token = localStorage.getItem("token")
        console.log('tokkkken',token);
        axios.post('http://127.0.0.1:8000/api/category/create/', newCatogery ,{
            headers: {
              'Authorization': `Token ${token}`
            } 
          })
        .then(res => {
          console.log('registerhandler response: ', res)
        }).catch(err => {
          console.log(err)
        })

    }

    return (
        <>
            <h1> Create Category</h1>
            <form>
                <div>
                    <label>  Category name </label>
                    <input type='text'name="Category_name" placeholder=" Category_name" onChange={changeHandler}></input>
                </div>
                <div>
                    <label> Description </label>
                    <input type='text' name="Description" placeholder="Description " onChange={changeHandler}></input>
                </div>
                <div>
                    <label> owner: </label>
                    <input type='text' name="owner" placeholder="owner" onChange={changeHandler}></input>
                </div>
                <div>
                    <label> Emojis </label>
                    <input type="Emojis" name="Emojis" placeholder="Emojis" onChange={changeHandler}></input>
                </div>
              
                <button onClick={createHandler}> create</button>
                
            </form>
        </>
    )
}