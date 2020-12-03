import React,{Component} from "react"
import {createRestaurant,getProfile} from "../components/UserFunction"
import Nominatim from "nominatim-geocoder"
import MuiAlert from '@material-ui/lab/Alert';
import {Redirect} from "react-router-dom"
const geocoder = new Nominatim()

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const withRestaurantAdmin = WrappedComponent =>( 
    class HOC extends Component{
        state={
            type:[],
            nameRestaurant:"",
            address:"",
            postalCode:"",
            city:"",
            rating:0,
            types:[],
            error:false,
            notif:"",
            redirect:false
         }

        componentDidMount(){
            if(localStorage.getItem('token')){
                getProfile(localStorage.getItem('token'))
                .then(res=>{
                    if(!res){
                        this.setState({redirect:true})
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
    
        handleClick=()=>{  // add a input tag
            let myType = [...this.state.type]
            myType.push("input")
            this.setState({type:myType})
        }
    
        handleDelete=(key)=>{ // delete a input type tag
            let myType = [...this.state.type]
            myType.splice(key,1)
            this.setState({type:myType})
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

            Object.keys(myTypes)
            .forEach(key=>{
                typesRestaurants.push(myTypes[key].value) 
            })
            this.setState({types:typesRestaurants})

            let latLng = await this.geocodeLatLon(this.state.address,this.state.postalCode,this.state.city)

            if(!latLng || this.state.address.trim()==""){
                this.setState({error:true,notif:<Alert severity="error">We don't find your address, please retry!</Alert>})
                return;
            }

            const newRestaurant = { // object restaurant with the properties of restaurant
                name: this.state.nameRestaurant,
                vicinity:`${this.state.address} ${this.state.postalCode} ${this.state.city}`,
                geometry:{
                    latitude:latLng.lat,
                    longitude:latLng.lon
                },
                ratings:this.state.rating,
                types:this.state.types,
                image:"https://duyt4h9nfnj50.cloudfront.net/resized/1544088810428-w2880-7c.jpg"
            }

            createRestaurant(newRestaurant,localStorage.getItem('token')) // function from userFunction to create a Restaurant
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
                    type={this.state.type}
                    nameRestaurant={this.state.nameRestaurant}
                    address={this.state.address}
                    postalCode={this.state.postalCode}
                    city={this.state.city}
                    rating={this.state.rating}
                    types={this.state.types}
                    error={this.state.error}
                    notif={this.state.notif}
                    handleChange={this.handleChange}
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