import React, { useState } from "react";

export default function Signup(props) {
    //Set state for the user into new user
    const [newuser, setNewUser] = useState({});
    //Function to handle any change in value of fields
    const changeHandler = (e) => {
        //Set copy of newuser into user every time
        const user = { ...newuser }
        //Set key with value for fields sent in the form
        user[e.target.name] = e.target.value
        console.log('user', user)
        //Set user to new user
        setNewUser(user)
    }
    //Function to pass the new user after click
    const registerHandler = (event) => {
        event.preventDefault()
        props.register(newuser)
    }

    return (
        <>
            <h1>Sign Up</h1>
            <form>
                <div>
                    <label> First Name: </label>
                    <input name="first_name" placeholder="first name" onChange={changeHandler}></input>
                </div>
                <div>
                    <label> Last Name: </label>
                    <input name="last_name" placeholder="last name" onChange={changeHandler}></input>
                </div>
                <div>
                    <label> Username: </label>
                    <input name="username" placeholder="username" onChange={changeHandler}></input>
                </div>
                <div>
                    <label> Email: </label>
                    <input name="email" placeholder="email" onChange={changeHandler}></input>
                </div>
                <div>
                    <label>Password: </label>
                    <input name="password" placeholder="password" onChange={changeHandler}></input>
                </div>
                <button onClick={registerHandler}>Sign Up</button>
                <p>Already have an account? <a href='/signin'>Sign In</a></p>
            </form>
        </>
    )
}