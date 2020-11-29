import React,{useState} from "react"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Redirect} from "react-router-dom"
import MuiAlert from '@material-ui/lab/Alert';
import {signUpUser} from "../UserFunction"

import "./login.css"

function Alert(props) { // component pur Alert
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const SignUpPage = ({viewSignUp,changeView}) =>{
    
    const [idLoginSignUp,setIdLoginSignUp]= useState({
        pseudo:"",
        email:"",
        password:"",
        redirect:false,
        error:false
    })
    const [notif,setNotif]= useState()

    const handleChange = (event) =>{
        const {name,value} = event.target
        let login = {...idLoginSignUp}
        switch(name){
            case "pseudo":
                login.pseudo=value
                break
            case "email":
                login.email=value
                break
            case "password":
                login.password=value
                break
            default:
                console.log("nothing")
        }
        login.error=false
        setIdLoginSignUp(login) 
    }

    const handleClick = (val) =>{
        changeView(!val)
    }

    const handleSubmit=(event)=>{ // submit 
        event.preventDefault()
        signUpUser(idLoginSignUp.pseudo,idLoginSignUp.email,idLoginSignUp.password) // function from UserFunction.js
        .then(res =>{ // if res is retrieved
            let login = {...idLoginSignUp} // get state idLogin in variable
            if(res){
                localStorage.setItem("token",res.token) // set token in localstorage
                login.redirect = true // set redirect to true
            }else{
                setNotif(<Alert severity="error">Un compte possède déjà ce mail</Alert>) // state notif with component Alert error
                login.error = true // set login to true
            }
            setIdLoginSignUp(login) // update state 
        })
    }

    if(idLoginSignUp.redirect){ // if redirect is true , redirect to map
        return <Redirect push to="/map"/>
    }

    return(
        <>
        <div className="myForm">
            <Form onSubmit={handleSubmit}>
                {idLoginSignUp.error?
                    notif
                    :
                    <span></span>
                }
                <Form.Group controlId="formBasicPseudo">
                    <Form.Label>Pseudo</Form.Label>
                    <Form.Control type="text" name="pseudo" placeholder="Enter pseudo" onChange={handleChange} value={idLoginSignUp.pseudo} required/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleChange} value={idLoginSignUp.email} required/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} value={idLoginSignUp.password} required/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Sign Up
                </Button>
                <p onClick={()=>handleClick(viewSignUp)} style={{marginTop:"5%",cursor:"pointer"}}>You have already an account?</p>
            </Form>
        </div>
        </>
    )
}

export default SignUpPage