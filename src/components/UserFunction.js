import axios from "axios"

export const loginUser = (email,password) =>{ // function login user with axios request
    return axios.post(`${process.env.REACT_APP_API_NODE}/api/auth/login`,{
        email,
        password
    })
    .then((response)=>{ // set token in localStorage
        return response.data.token // return token 
    })
    .catch((e)=>{
        console.log(e)
    })
}

export const getProfile = (token) =>{
   return axios.get(`${process.env.REACT_APP_API_NODE}/api/auth/me`,{
        headers:{Authorization:`Bearer ${token}`}
    })
    .then(response=>{
        return response.data.connected
    })
    .catch(error =>{
        console.log(error)
    })
}

export const logOutUser = (token) =>{
    return axios.get(`${process.env.REACT_APP_API_NODE}/api/auth/logout`,{
        headers:{Authorization:`Bearer ${token}`}
    })
    .then(response =>{
        return response
    })
    .catch(error =>{
        console.log(error)
    })
}