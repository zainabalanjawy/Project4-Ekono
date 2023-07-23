import React from 'react'
import axios from 'axios'

export default function Profile(props) {
  //I don't have the id to send the req
// const response = axios.get(`http://127.0.0.1:8000/auth/${props.user.id}/profile/`)
// console.log("profile response.data: ", response.data)
return (
    <>
      <div>Profile</div>
      <form>
        <div>
          <label> first Name: </label>
          <input type='text' name="first_name" placeholder="first name"></input>
        </div>
        <div>
          <label> Last Name: </label>
          <input type='text' name="last_name" placeholder="last name"></input>
        </div>
        <div>
          <label> Username: </label>
          <input type='text' name="username" placeholder="username"></input>
        </div>
        <div>
          <label> Email: </label>
          <input type="email" name="email" placeholder="example@gmail.com"></input>
        </div>
        <div>
          <label> Address: </label>
          <input type='text' name="address" placeholder="first name"></input>
        </div>
        <div>
          <label> Budget </label>
          <input type="number" name="budget" placeholder="your monthly expected income"></input>
        </div>
        <div>
          <label>Password: </label>
          <input type="password" name="password1" placeholder="password"></input>
        </div>
        <div>
          <input type="hidden" name="password"></input>
        </div>
        <div>
          <label>Confirm Password: </label>
          <input type="password" name="password2" placeholder="password"></input>
        </div>
        {/* <button onClick={registerHandler}>Sign Up</button> */}
        <p>Already have an account? <a href='/signin'>Sign In</a></p>
      </form>

    </>
  )
}
