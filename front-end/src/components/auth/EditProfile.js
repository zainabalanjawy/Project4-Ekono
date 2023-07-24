import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function EditProfile(props) {
  //state to save user information
  const [user, setUser] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    handleUser()
  }, [])

  async function handleUser() {
    const token = localStorage.getItem('token')
    console.log('handleUse token: ', token)
    const response = await axios.post(`http://127.0.0.1:8000/auth/profile/`, {
      headers:
      {
        'Authorization': `Token ${token}`
      }
    })
    console.log("profile response.data: ", response.data[0])
    setUser(response.data[0])
    console.log(user)    
  }
  return (
    <>
      <div>Profile</div>
      <form>
        <div>
          <label> first Name: </label>
          <input type='text' name="first_name" placeholder="first name" value={user.first_name}></input>
        </div>
        <div>
          <label> Last Name: </label>
          <input type='text' name="last_name" placeholder="last name" value={user.last_name}></input>
        </div>
        <div>
          <label> Username: </label>
          <input type='text' name="username" placeholder="username" value={user.username}></input>
        </div>
        <div>
          <label> Email: </label>
          <input type="email" name="email" placeholder="example@gmail.com" value={user.email}></input>
        </div>
        <div>
          <label> Address: </label>
          <input type='text' name="address" placeholder="first name" value={user.address}></input>
        </div>
        <div>
          <label> Budget </label>
          <input type="number" name="budget" placeholder="your monthly expected income" value={user.budget}></input>
        </div>
        <p><a href='#'>Change Password?</a></p>
        <button>Edit Profile</button>
      </form>
    </>
  )
}
