import React,{useState} from "react"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Redirect} from "react-router-dom"
import MuiAlert from '@material-ui/lab/Alert';
import {loginUser,getProfile} from "../UserFunction"
import AppBar from "../AppBar/appBar"

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

    const handleChange = (event) =>{
        const {name,value} = event.target
        let login = {...idLogin}
        name === "email" ? login.email = value : login.password = value
        login.error=false
        setidLogin(login)
    }

    const handleSubmit=(event)=>{
        event.preventDefault()
        loginUser(idLogin.email,idLogin.password) // function from UserFunction.js
        .then(res=>{
            let login = {...idLogin}
            if(res){
                localStorage.setItem("token",res)
                login.redirect = true
            }else{
                login.error = true
            }
            setidLogin(login)
        })
    }

    if(localStorage.getItem('token')){ // if token is present , redirect to map
        getProfile(localStorage.getItem('token')) // function from UserFunction.js
        .then(res=>{
            if(res){
                let login = {...idLogin}
                login.redirect = true
                setidLogin(login)
            }else{
                localStorage.clear()
                console.log("token expiré")
            }
        })
    } 
    
    if(idLogin.redirect){
        return <Redirect push to="/map"/>
    }

    return(
        <>
        <AppBar/>
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
        </>
    )
}

export default SignUpPage