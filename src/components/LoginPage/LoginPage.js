import React,{useState} from "react"
import AppBar from "../AppBar/appBar"
import SignIn from "./signIn"
import SignUp from "./signUp"

const LoginPage = () =>{

    const [view,setView]=useState(false)
    
    const changeView = (val) =>{ // function to change boolean value to change
        setView(val)
    }

    return(
        <>
            <AppBar/>
            {
                view?
                <SignUp viewSignUp={view} changeView={changeView}/> // Component sign up
                :
                <SignIn viewSignIn={view} changeView={changeView}/> // Component sign in
            }
        </>
    )
}

export default LoginPage