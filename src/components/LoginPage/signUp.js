import React,{useState} from "react"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from "axios"
import {Redirect} from "react-router-dom"
import MuiAlert from '@material-ui/lab/Alert';

import "./login.css"

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const SignUpPage = () =>{
    
    const [idLogin,setidLogin]= useState({
        email:"",
        password:"",
        error:false
    })
    const [token,setToken] = useState(null)

    const handleChange = (event) =>{
        const {name,value} = event.target
        let login = {...idLogin}
        name === "email" ? login.email = value : login.password = value
        login.error=false
        setidLogin(login)
    }

    const handleSubmit=(event)=>{
        event.preventDefault()
        axios.post(`${process.env.REACT_APP_API_NODE}/api/auth/login`,{
            email:idLogin.email,
            password:idLogin.password
        })
        .then((response)=>{ // set token in localStorage
            localStorage.clear()
            localStorage.setItem("token",response.data.token)
            setToken(response.data.token) // function who start my function in action.js to store my new token
        })
        .catch((e)=>{ // change state login.error to true to do appear the error notification
            let login = {...idLogin}
            login.error = true
            setidLogin(login)
        })

    }
     if(token){ // if token is present , redirect to map
        return(
            <Redirect push to="/map"/>
        )
    } 
    return(
        <div className="myForm">
            <Form onSubmit={handleSubmit}>
                {idLogin.error?
                    <Alert severity="error">Email or password incorrect!</Alert>
                    :
                    <span></span>
                }
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleChange} value={idLogin.email} required/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} value={idLogin.password} required/>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Sign In
                </Button>
            </Form>
        </div>
    )
}

export default SignUpPage