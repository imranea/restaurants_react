import React,{useState} from "react"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Redirect} from "react-router-dom"
import MuiAlert from '@material-ui/lab/Alert';
import {loginUser,getProfile} from "../UserFunction"
import "./login.css"

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const SignInPage = ({viewSignIn,changeView}) =>{
    
    const [idLogin,setidLogin]= useState({
        email:"",
        password:"",
        redirect:false,
        error:false
    })
    const [notif,setNotif]= useState()


    const handleChange = (event) =>{
        const {name,value} = event.target
        let login = {...idLogin}
        name === "email" ? login.email = value : login.password = value
        login.error=false
        setidLogin(login)
    }

    const handleClick = (val) =>{
        changeView(!val)
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
                //setNotif(1)
                setNotif(<Alert severity="error">Mauvais identifiant ou mot de passe</Alert>)
                login.error = true
            }
            setidLogin(login)
        })
    }

    if(localStorage.getItem('token')){ // if token is present , redirect to map
        getProfile(localStorage.getItem('token')) // function from UserFunction.js
        .then(res=>{
            let login = {...idLogin}
            if(res){
                login.redirect = true
                setidLogin(login)
            }else{
                localStorage.clear()
                setNotif(<Alert severity="success">Vous avez été deconnecté</Alert>)
                login.error = true
                setidLogin(login)
            }
        })
    } 
    
    if(idLogin.redirect){
        return <Redirect push to="/map"/>
    }

    return(
        <>
        <div className="myForm">
            <Form onSubmit={handleSubmit}>
                {idLogin.error?
                    notif
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
                <Button variant="primary" type="submit">
                    Sign In
                </Button>
                <p onClick={()=>handleClick(viewSignIn)} style={{marginTop:"5%",cursor:"pointer"}}>Create new account?</p>
            </Form>
        </div>
        </>
    )
}

export default SignInPage