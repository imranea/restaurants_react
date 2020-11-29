import React,{useState} from "react"
import AppBar from "../AppBar/appBar"
import SignIn from "./signIn"
import SignUp from "./signUp"

const LoginPage = () =>{

    const [view,setView]=useState(false)
    return(
        <>
            <AppBar/>
            {
                view?
                <SignUp/>
                :
                <SignIn/>
            }
        </>
    )
}

export default LoginPage