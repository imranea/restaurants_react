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

export const signUpUser = (newUser) =>{ // function signup user with axios request
    return axios.post(`${process.env.REACT_APP_API_NODE}/api/auth/signup`,newUser)
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

export const uploadAvatar = (token,data) =>{
    return axios.post(`${process.env.REACT_APP_API_NODE}/api/auth/meAvatar`, data, {
        'content-type': 'multipart/form-data',
        headers:{Authorization:`Bearer ${token}`}
    })
    .then(res => { // then print response status
        return res.data.message
    })
    .catch(e=>{
        return e.response.status
    })
}


export const updateUser = (token,userToUpdate) =>{
    return axios.patch(`${process.env.REACT_APP_API_NODE}/api/auth/me`,userToUpdate,{
        headers:{Authorization:`Bearer ${token}`}
    })
    .then(res => { // then print response status
        return res
    })
    .catch(e=>{
        return e.response.status
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

export const getRestaurantById = (token,id) =>{
    return axios.get(`${process.env.REACT_APP_API_NODE}/api/restaurants/userRestaurants/${id}`,{
       headers:{Authorization:`Bearer ${token}`} 
    })
    .then(response=>{
        return response.data.restaurant
    })
    .catch(e=>{
        return e.response.status
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

export const updateRestaurant = (restaurant,id,token) =>{
    return axios.patch(`${process.env.REACT_APP_API_NODE}/api/restaurants/update/${id}`,restaurant,
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