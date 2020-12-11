import React,{Component} from "react"
import {createRestaurant} from "../components/RestaurantFunction"
import {getProfile} from "../components/UserFunction"
import Nominatim from "nominatim-geocoder"
import MuiAlert from '@material-ui/lab/Alert';
import {Redirect} from "react-router-dom"
import Form from 'react-bootstrap/Form'
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
const geocoder = new Nominatim()

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const withRestaurantAdmin = WrappedComponent =>( 
    class HOC extends Component{
        state={
            inputType:[],
            nameRestaurant:"",
            address:"",
            postalCode:"",
            city:"",
            rating:0,
            types:[],
            urlAvatar:"",
            error:false,
            notif:"",
            redirect:false
         }

        componentDidMount(){
            if(localStorage.getItem('token')){
                getProfile(localStorage.getItem('token'))
                .then(res=>{
                    if(!res){
                       return this.setState({redirect:true})
                    }
                })
            }else{
                this.setState({redirect:true})
            }
        }
    
        handleChange = (event) =>{  // function handle change the state dependind the fiel update
            const {name,value} = event.target
            this.setState({[name]:value,error:false})    
        }

        onChangeHandler=(event)=>{ // display previous image by input file et update state with the file
            let image = document.getElementById('uploadAvatar');
            image.src = URL.createObjectURL(event.target.files[0]);
            image.style.display="initial"
            this.setState({
                selectedFile: event.target.files[0]
            })
        }
    
        handleClick=()=>{ // function to add an input in the form for type restaurant
            const myInput = [...this.state.inputType]
            myInput.push(<div style={{display:"flex"}} key={myInput.length}>
            <Form.Control type="text" placeholder="Type of Restaurant" className="typeRestaurant" onChange={this.handleChange} key={myInput.length}/>
            <IndeterminateCheckBoxIcon color="primary" style={{margin:"auto"}} onClick={(key)=>this.handleDelete(key)}/>
            </div>)
            this.setState({inputType:myInput})
        }
        handleDelete=(key)=>{ // delete input filed
            let myTypes = [...this.state.inputType]
            myTypes.splice(key+1,1)
            this.setState({inputType:myTypes})
        }

        geocodeLatLon = (adress,pc,city) =>{
            return geocoder.search( { q: `${adress} ${pc} ${city} France` } )
            .then((response) => {
                return {
                    lat:response[0].lat,
                    lon:response[0].lon
                }
            })
            .catch((error) => {
                console.log(error)
            })
        }
    
        handleSubmit=async(event)=>{ // form submit
            event.preventDefault()
            let typesRestaurants = [...this.state.types] // get the state types
            let myTypes = document.getElementsByClassName('typeRestaurant') //get all input type with class typeRestaurant

            const data = new FormData() // variable with our file
            data.append('myImage', this.state.selectedFile)

            Object.keys(myTypes)
            .forEach(key=>{
                typesRestaurants.push(myTypes[key].value) 
            })
            this.setState({types:typesRestaurants})

            let latLng = await this.geocodeLatLon(this.state.address,this.state.postalCode,this.state.city)

            if(!latLng || this.state.address.trim()===""){
                this.setState({error:true,notif:<Alert severity="error">We don't find your address, please retry!</Alert>})
                return;
            }

            const newRestaurant = { // object restaurant with the properties of restaurant
                name: this.state.nameRestaurant,
                vicinity:`${this.state.address} ${this.state.postalCode} ${this.state.city}`,
                address:this.state.address,
                postalCode:this.state.postalCode,
                city:this.state.city,
                geometry:{
                    location:{
                        lat:latLng.lat,
                        lng:latLng.lon
                    }
                },
                ratings:this.state.rating,
                types:this.state.types
            }

            data.append('restaurant', JSON.stringify(newRestaurant))

            createRestaurant(data,localStorage.getItem('token')) // function from userFunction to create a Restaurant
            .then(res=>{
                if(res === 400){
                    this.setState({error:true,notif:<Alert severity="error">The restaurant already exist</Alert>})
                }else if(res === undefined){
                    this.setState({error:true,notif:<Alert severity="error">Server problem, retry soon</Alert>})
                }
                else{
                    this.setState({error:true,notif:<Alert severity="success">Your Restaurant is created</Alert>})
                }
            })
            .catch(e=>{
                this.setState({error:true,notif:<Alert severity="error">Server problem, retry soon</Alert>})
            })
        }

        render(){
            if(this.state.redirect){
                return <Redirect to="/"/>
            }
            return(
                <WrappedComponent
                    inputType={this.state.inputType}
                    nameRestaurant={this.state.nameRestaurant}
                    address={this.state.address}
                    postalCode={this.state.postalCode}
                    city={this.state.city}
                    rating={this.state.rating}
                    types={this.state.types}
                    urlAvatar={this.state.urlAvatar}
                    error={this.state.error}
                    notif={this.state.notif}
                    redirect={this.state.redirect}
                    handleChange={this.handleChange}
                    onChangeHandler={this.onChangeHandler}
                    handleClick={this.handleClick}
                    handleDelete={this.handleDelete}
                    handleSubmit={this.handleSubmit}
                    {...this.props}
                />
            )
        }
    }
)

export default withRestaurantAdmin