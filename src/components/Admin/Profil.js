import React,{Component} from "react"
import AppBar from "../AppBar/appBar"
import {getProfile} from "../UserFunction"
import imgBackground from "../../img/background-user.jpg"
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import {NavLink} from "react-router-dom"
import { Nav } from "react-bootstrap";


class Profil extends Component {
    constructor(){
      super()
      this.state={
        id:"",
        name:"",
        email:"",
        age:"",
        urlAvatar:""
      }
    }

    componentDidMount(){ // when the component is mount , check if token exist and vald et get properties from the user
      if(localStorage.getItem('token')){
        getProfile(localStorage.getItem('token'))
        .then(res=>{
          this.setState({
            id:res._id,
            name:`${res.firstname.charAt(0).toUpperCase()+res.firstname.substr(1)} ${res.lastname.charAt(0).toUpperCase()+res.lastname.substr(1)}`,
            email:res.email,
            age:res.age,
            profession:res.profession.charAt(0).toUpperCase()+res.profession.substr(1),
            urlAvatar:`${process.env.REACT_APP_API_NODE}/api/auth/meAvatar/${res._id}`
          })
        })
      }
    }
    
      render(){
        return(
            <> 
{/*                 <AppBar/> */}
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
                    </div>
                </section>
            </>
        )
      }
        
}

export default Profil