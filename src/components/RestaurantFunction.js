import axios from "axios"

export const getRestaurantsUser = (token) =>{
    return axios.get(`${process.env.REACT_APP_API_NODE}/api/restaurants/userRestaurants`,{
        headers:{Authorization:`Bearer ${token}`}
    })
    .then(response=>{
        return response.data
    })
    .catch(e=>{
        return e.response
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
        headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        }
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