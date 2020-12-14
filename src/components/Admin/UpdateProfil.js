import React,{Component} from "react"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './form.css'
import IconButton from '@material-ui/core/IconButton';
import MuiAlert from '@material-ui/lab/Alert';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import AppBar from "../AppBar/appBar"
import {uploadAvatar,updateUser,getProfile} from "../UserFunction"
import {Redirect} from "react-router-dom"

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class UpdateProfil extends Component{

    state={
        firstname:"",
        lastname:"",
        age:"",
        profession:"",
        email:"",
        password:"",
        selectedFile: null,
        urlAvatar:"",
        notif:false,
        alert:"",
        redirect:false
    }

    componentDidMount(){ // when the component is mount , check if token exist and vald et get properties from the user and complete the field of the form
        if(localStorage.getItem('token')){
            getProfile(localStorage.getItem('token'))
            .then(res=>{
              if(!res){
                this.setState({redirect:true})
              }
              this.setState({
                firstname:`${res.firstname.charAt(0).toUpperCase()+res.firstname.substr(1)}`,
                lastname:`${res.lastname.charAt(0).toUpperCase()+res.lastname.substr(1)}`,
                age:res.age,
                profession:res.profession.charAt(0).toUpperCase()+res.profession.substr(1),
                email:res.email,
                urlAvatar:`${process.env.REACT_APP_API_NODE}/api/auth/meAvatar/${res._id}`
              })
              let image = document.getElementById('uploadAvatar');
              image.onerror = function(e) { // if image is not found
                  image.style.display="none" 
              };
            })
        }
    }

    onChangeHandler=(event)=>{ // display previous image by input file et update state with the file
        let image = document.getElementById('uploadAvatar');
        image.src = URL.createObjectURL(event.target.files[0]);
        image.style.display="initial"
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    handleChange = (e) =>{ // update state in the form
        const {name,value} = e.target
        this.setState({[name]:value})
    }

    handleSubmit = (event) =>{
        event.preventDefault()
        const data = new FormData() // variable with our file
        data.append('myImage', this.state.selectedFile)
        const user={ // object user to send in the request aios
            firstname:this.state.firstname,
            lastname:this.state.lastname,
            age:this.state.age,
            profession:this.state.profession,
            password:this.state.password,
        }
        updateUser(localStorage.getItem("token"),user) // request update user
        .then(res=>{
            if(res === 404){ // error code
                return this.setState({alert:<Alert severity="error">The field you want to change is invalid</Alert>,notif:true})
            }else if(res === 400){ // error code
                return this.setState({alert:<Alert severity="error">Please retry soon</Alert>,notif:true})
            }else{ 
                if(this.state.selectedFile === null){ // if the user don't change the avatar just display notif true
                    return this.setState({alert:<Alert severity="success">Your profile has been updated</Alert>,notif:true})
                }
                uploadAvatar(localStorage.getItem("token"),data) // if the user change the avatar, update the avatar user
                .then(res=>{
                    if(res === 400){
                        return this.setState({alert:<Alert severity="error">Your file is too large</Alert>,notif:true})
                    }
                    this.setState({alert:<Alert severity="success">Your profile has been updated</Alert>,notif:true})
                }) 
            }
        })
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
            <h1 style={{textAlign:"center"}}>Update Profile</h1>
            <div className="myFormRestaurant">
                <Form onSubmit={this.handleSubmit}>
                    {
                        this.state.notif?
                            this.state.alert
                            :
                            <span></span>
                    }
                    <input accept="image/*" style={{display:"none"}} id="icon-button-file" type="file" name="myImage" onChange={this.onChangeHandler}/>
                    <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera />
                        </IconButton>
                    </label>
                    <img id="uploadAvatar" src={this.state.urlAvatar} alt=""/>
                    <Form.Group controlId="formBasicFirstname">
                        <Form.Label>FirstName</Form.Label>
                        <Form.Control type="text" name="firstname" placeholder="Enter your firstname" value={this.state.firstname} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group controlId="formBasicLastname">
                        <Form.Label>Lastname</Form.Label>
                        <Form.Control type="text" name="lastname" placeholder="Enter your lastname" value={this.state.lastname} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group controlId="formBasicAge">
                        <Form.Label>Age</Form.Label>
                        <Form.Control type="number" name="age" placeholder="Age" min='0' value={this.state.age} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group controlId="formBasicProfession">
                        <Form.Label>Profession</Form.Label>
                        <Form.Control type="text" name="profession" placeholder="Enter your profession" value={this.state.profession} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter your email" value={this.state.email} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Enter your password" value={this.state.password} onChange={this.handleChange} required/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
            </>
        )
    }
}

export default UpdateProfil