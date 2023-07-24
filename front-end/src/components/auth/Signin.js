import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'

export default function Signin(props) {
    //initialize state
    const [newUser, setNewUser] = useState({}) //new user is going to be an object

    //to get whatever the user is writing instantly
    const changeHandler = (e) => {
        const user = { ...newUser } //copying what's in newUser to the user const EVERYTIME a user write anything and add changes
        user[e.target.name] = e.target.value //user[the filed where we currently in] = [the value of this input field]
        console.log(user)
        setNewUser(user) //set the newUser value to be what's in the variable user
    }
    //when the submit button clicked
    const loginHandler = (event) => {
        props.login(newUser)
    }
    return (
        <>
            <h1>Sign In</h1>
            <Container>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control name='username' onChange={changeHandler} placeholder="username"></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control name='password' type='password' onChange={changeHandler} placeholder="password"></Form.Control>
                    <p>Forget your Password? <a href='#'>Click here</a></p>

                </Form.Group>
                <Button variant='primary' onClick={loginHandler}>Login</Button>
                <p>Don't have an account? <a href='/signup'>Register</a></p>

            </Container>
        </>
    )
}
