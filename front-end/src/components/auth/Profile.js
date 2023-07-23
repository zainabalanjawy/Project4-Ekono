import React from 'react'
import axios from 'axios'

export default function Profile(props) {
  //I don't have the id to send the req
  function handleUser(){
    const response = axios.get(`http://127.0.0.1:8000/auth/10/profile/`)
    console.log("profile response.data: ", response)
    return(
      <>
      <form>
        <div>
          <label> first Name: </label>
          <input type='text' name="first_name" placeholder="first name" value={response.data.first_name}></input>
        </div>
        <div>
          <label> Last Name: </label>
          <input type='text' name="last_name" placeholder="last name" value={response.data.last_name}></input>
        </div>
        <div>
          <label> Username: </label>
          <input type='text' name="username" placeholder="username" value={response.data.username}></input>
        </div>
        <div>
          <label> Email: </label>
          <input type="email" name="email" placeholder="example@gmail.com" value={response.data.email}></input>
        </div>
        <div>
          <label> Address: </label>
          <input type='text' name="address" placeholder="first name" value={response.data.address}></input>
        </div>
        <div>
          <label> Budget </label>
          <input type="number" name="budget" placeholder="your monthly expected income" value={response.data.budget}></input>
        </div>
        <p><a href='#'>Change Password?</a></p>
        <button>Edit Profile</button>
      </form>
      </>
    )
  }
return (
    <>
      <div>Profile</div>
      {handleUser}
    </>
  )
}
