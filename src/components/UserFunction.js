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

export const signUpUser = (name,email,password) =>{ // function signup user with axios request
    return axios.post(`${process.env.REACT_APP_API_NODE}/api/auth/signup`,{
        name,
        email,
        password
    })
    .then((response)=>{ // set token in localStorage
        return response.data // return token 
    })
    .catch((e)=>{
        console.log(e)
    })
}

export const getProfile = (token) =>{ // check if token is correct to authorizate the navigation for the user
   return axios.get(`${process.env.REACT_APP_API_NODE}/api/auth/me`,{
        headers:{Authorization:`Bearer ${token}`}
    })
    .then(response=>{
        return response.data
    })
    .catch(error =>{
        console.log(error)
    })
}

export const logOutUser = (token) =>{ // logout (remove the present token from the database)
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

export const createRestaurant = (restaurant,token) =>{ // create restaurant
    return axios.post(`${process.env.REACT_APP_API_NODE}/api/restaurants/create`,restaurant,
    {
        headers:{Authorization:`Bearer ${token}`}
    })
    .then((response)=>{ // set token in localStorage
        return response.data // return token 
    })
    .catch((e)=>{
        return e.response.status
    })
}