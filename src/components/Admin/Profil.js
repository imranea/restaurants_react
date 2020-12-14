import React,{Component} from "react"
import AppBar from "../AppBar/appBar"
import {getProfile} from "../UserFunction"
import {getRestaurantsUser} from "../RestaurantFunction"
import imgBackground from "../../img/background-user.jpg"
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import {NavLink,Redirect} from "react-router-dom"
import GridList from "../RestaurantList/RestaurantUser/GridList"


class Profil extends Component {
    constructor(){
      super()
      this.state={
        id:"",
        name:"",
        email:"",
        age:"",
        urlAvatar:"",
        restaurants:[],
        redirect:false
      }
    }

    componentDidMount(){ // when the component is mount , check if token exist and vald et get properties from the user
      if(localStorage.getItem('token')){
        getProfile(localStorage.getItem('token'))
        .then(res=>{
          if(!res){
            this.setState({redirect:true})
          }
          this.setState({
            id:res._id,
            name:`${res.firstname.charAt(0).toUpperCase()+res.firstname.substr(1)} ${res.lastname.charAt(0).toUpperCase()+res.lastname.substr(1)}`,
            email:res.email,
            age:res.age,
            profession:res.profession.charAt(0).toUpperCase()+res.profession.substr(1),
            urlAvatar:`${process.env.REACT_APP_API_NODE}/api/auth/meAvatar/${res._id}`
          })
          getRestaurantsUser(localStorage.getItem('token'))
          .then(res=>{
            this.setState({restaurants:res})
          })
        })
      }
    }
    
      render(){
        if(this.state.redirect){ // if token is null, redirect to login page
          return (
            <Redirect to="/" />
          )
        }
        return(
            <> 
                <AppBar authentificate={this.state.redirect}/>
                <section style={{width:"100%",height:"100%"}}>
                    <div style={{backgroundImage:`url(${imgBackground})`,height: "50%",display:"flex"}}>
                        <figure style={{margin:"auto",flexDirection: "column"}}>
                            <Avatar alt={this.state.name} src={this.state.urlAvatar} style={{margin:"auto",width:"100px",height:"100px"}}/>
                            <figcaption style={{textAlign:"center"}}>
                                <h2 style={{color:"white"}}>{this.state.name}</h2>
                                <h2 style={{color:"white"}}>Age : {this.state.age} ans</h2>
                                <h3 style={{color:"white"}}>Email : {this.state.email}</h3>
                                <h3 style={{color:"white"}}>Profession : {this.state.profession}</h3>
                                <NavLink to="/updateProfile">
                                  <Button variant="contained" color="primary">
                                  Update
                                </Button>
                                </NavLink>
                                
                            </figcaption>
                        </figure>
                    </div>
                    <div>
                      <h1 style={{textAlign:"center"}}>Les restaurants</h1>
                        <GridList restaurants={this.state.restaurants}/>
                    </div>
                </section>
            </>
        )
      }
        
}

export default Profil