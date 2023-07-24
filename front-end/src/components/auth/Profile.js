import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Profile(props) {
  //state to save user information
  const [user, setUser] = useState({})
  const [edit, setEdit] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    handleUser()
  }, [])

  async function handleUser() {
    const token = localStorage.getItem('token')
    console.log('handleUse token: ', token)
    const response = await axios.get(`http://127.0.0.1:8000/auth/profile/`, {
      headers:
      {
        'Authorization': `Token ${token}`
      }
    })
    // console.log("profile response.data: ", response.data[0])
    setUser(response.data[0])
    console.log('User Info:' ,user)    
  }
  function handleEditProfile(e){
    e.preventDefault()
    setEdit(true)
  }
  function handleChange(e) {
    const att = e.target.name
    const val = e.target.value

    let currentUser = {...user}
    currentUser[att] = val
    setUser(currentUser)
  }
  async function handleSubmitProfile(e){
    e.preventDefault()
    try{
      console.log(user.id)
      const response =  await axios.put(`http://127.0.0.1:8000/auth/${user.id}/update/`, user)
      console.log(response.data)
      setEdit(false)
      setUser(response.data)
    }catch(err){
      console.log(err)
    }
  }
  async function handleDeleteAccount(e){
    e.preventDefault()

    const response =  await axios.delete(`http://127.0.0.1:8000/auth/${user.id}/delete/`, user)
    try{

      if(response.status === 204){
        const token = localStorage.removeItem('token')
        console.log('Account deleted successfully')
        navigate('/')
      }else{
        console.log('Something went wrong.')
      }
    }catch(error){
      console.log(error.message)
    }
  }
  if(!edit){
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
          {/* <p><a href='#'>Change Password?</a></p> */}
          <button onClick={handleEditProfile}>Edit Profile</button>
        </form>
      </>
    )
  }
  else{
    return (
      <>
        <div>Edit Profile</div>
        <form>
          <div>
            <label> first Name: </label>
            <input onChange={handleChange} type='text' name="first_name" placeholder="first name" value={user.first_name}></input>
          </div>
          <div>
            <label> Last Name: </label>
            <input onChange={handleChange} type='text' name="last_name" placeholder="last name" value={user.last_name}></input>
          </div>
          <div>
            <label> Username: </label>
            <input onChange={handleChange} type='text' name="username" placeholder={user.username} value={user.username}></input>
          </div>
          <div>
            <label> Email: </label>
            <input onChange={handleChange} type="email" name="email" placeholder="example@gmail.com" value={user.email}></input>
          </div>
          <div>
            <label> Address: </label>
            <input onChange={handleChange} type='text' name="address" placeholder="first name" value={user.address}></input>
          </div>
          <div>
            <label> Budget </label>
            <input onChange={handleChange} type="number" name="budget" placeholder="your monthly expected income" value={user.budget}></input>
          </div>
          <input type="hidden" name="password" value={user.password}></input>

          {/* <p><a href='#'>Change Password?</a></p> */}
          <button onClick={handleSubmitProfile}>Submit</button>
          <button onClick={handleDeleteAccount}>Delete Account Permenantly</button>
        </form>
      </>
    )
  }

}
