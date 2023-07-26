import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../../PageContainer.css'
import { useNavigate } from 'react-router-dom'
import HomeNavbar from 'components/Navbars/HomeNavbar'
import Footer from 'components/Footer/FooterHome'
import classnames from "classnames";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Label,
  FormGroup,
  Form,
  Input,
  FormText,
  NavItem,
  NavLink,
  Nav,
  Table,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  UncontrolledCarousel,
} from "reactstrap";

export default function Profile(props) {
  //state to save user information
  const [user, setUser] = useState({})
  const [edit, setEdit] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    handleUser()
  }, [])
  //get the user
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
    console.log('User Info:', user)
  }
  //handle the button click to show the edit view 
  function handleEditProfile(e) {
    e.preventDefault()
    setEdit(true)
  }
  //handle changes in the values
  function handleChange(e) {
    const att = e.target.name
    const val = e.target.value

    let currentUser = { ...user }
    currentUser[att] = val
    setUser(currentUser)
  }
  //modify user data in the database
  async function handleSubmitProfile(e) {
    e.preventDefault()
    try {
      console.log(user.id)
      const response = await axios.put(`http://127.0.0.1:8000/auth/${user.id}/update/`, user)
      console.log(response.data)
      setEdit(false)
      setUser(response.data)
    } catch (err) {
      console.log(err)
    }
  }
  //delete user account permenantly
  async function handleDeleteAccount(e) {
    e.preventDefault()
    prompt("This action will result in permenantly deleting your account!")
    const token = localStorage.getItem('token')

    const response = await axios.delete(`http://127.0.0.1:8000/auth/${user.id}/delete/`, user, {
      headers:
      {
        'Authorization': `Token ${token}`
      }
    })
    try {

      if (response.status === 204) {
        const token = localStorage.removeItem('token')
        console.log('Account deleted successfully')
        navigate('/')
      } else {
        console.log('Something went wrong.')
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  
  if (!edit) {
    return (
      <>
         <HomeNavbar logout={props.logout}/>
        <div className='PageContainer'>
          <h1 className='header'>Profile</h1>
          <Form>
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <label className='label'>First Name</label>
                            <Input type='text' name="first_name" placeholder="first name" value={user.first_name}/>
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label className='label'>Last Name: </label>
                            <Input  type='text' name="last_name" placeholder="last name" value={user.last_name} />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <label className='label'>Username: </label>
                            <Input type='text' name="username" placeholder="username" value={user.username}/>
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label className='label'>Email Address: </label>
                            <Input type="email" name="email" placeholder="example@gmail.com" value={user.email}/>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label className='label'>Budget</label>
                            <Input type="number" name="budget" placeholder="your monthly expected income" value={user.budget}/>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Button
                        className="btn-round float-right"
                        color="primary"
                        data-placement="right"
                        id="tooltip341148792"
                        type="button"
                        onClick={handleEditProfile}
                      >
                        Edit Profile?
                      </Button>
                    </Form>
        </div>
        <Footer />
      </>

    )

  }
  else {
    return (
      <>
         <HomeNavbar logout={props.logout}/>
        <div className='PageContainer'>
          <h1 className='header'>Edit Profile</h1>
        <Form>
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <label className='label'>First Name</label>
                            <Input onChange={handleChange} type='text' name="first_name" placeholder="first name" value={user.first_name}/>
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label className='label'>Last Name: </label>
                            <Input  onChange={handleChange} type='text' name="last_name" placeholder="last name" value={user.last_name}/>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <label className='label'>Username: </label>
                            <Input onChange={handleChange} type='text' name="username" placeholder={user.username} value={user.username}/>
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                            <label className='label'>Email Address: </label>
                            <Input onChange={handleChange} type="email" name="email" placeholder="example@gmail.com" value={user.email}/>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label className='label'>Budget</label>
                            <Input onChange={handleChange} type="number" name="budget" placeholder="your monthly expected income" value={user.budget}/>
                          </FormGroup>
                        </Col>
                        <input type="hidden" name="password" value={user.password}></input>
                      </Row>                      
                      <Button
                        className="btn-round float-right"
                        color="primary"
                        data-placement="right"
                        id="tooltip341148792"
                        type="button"
                        onClick={handleSubmitProfile}
                      >
                        Submit
                      </Button>
                      <Button
                        className="btn-round float-right"
                        color="primary"
                        data-placement="right"
                        id="tooltip341148792"
                        type="button"
                        onClick={handleDeleteAccount}
                      >
                        Delete Account
                      </Button>

                    </Form>
                    </div>
        <Footer />
      </>
    )
  }

}
