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
                    <label> Username: </label>
                    <input type='text' name="username" placeholder="username" onChange={changeHandler}></input>
                </div>
                <div>
                    <label>Password: </label>
                    <input type="password" name="password1" placeholder="password" onChange={changeHandler}></input>
                </div>
                <div>
                    <input type="hidden" name="password" value={newuser['password1']}></input>
                </div>
                <div>
                    <label>Confirm Password: </label>
                    <input type="password" name="password2" placeholder="password" onChange={changeHandler}></input>
                </div>
                <button onClick={registerHandler}>Sign Up</button>
                <p>Already have an account? <a href='/signin'>Sign In</a></p>
            </form>
        </>
    )
}