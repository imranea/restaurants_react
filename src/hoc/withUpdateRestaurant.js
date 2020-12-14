import React,{Component} from "react"
import {getRestaurantById,updateRestaurant} from "../components/RestaurantFunction"
import {getProfile} from "../components/UserFunction"
import Nominatim from "nominatim-geocoder"
import MuiAlert from '@material-ui/lab/Alert';
import Form from 'react-bootstrap/Form'
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import {Redirect} from "react-router-dom"

const geocoder = new Nominatim()

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const withUpdateRestaurant = WrappedComponent =>( // hoc 
    class HOC extends Component{
        state={
            inputType:[],
            nameRestaurant:"",
            address:"",
            postalCode:"",
            city:"",
            rating:"",
            typeFirst:"",
            types:[],
            urlAvatar:"",
            selectedFile:"",
            alert:false,
            notif:"",
            idRestaurant:"",
            redirect:false
        }
    
        componentDidMount(){
            if(localStorage.getItem('token')){
                getProfile(localStorage.getItem('token'))
                .then(res=>{
                    if(!res){
                        return this.setState({redirect:true})
                    }
                    this.setState({idRestaurant:this.props.match.params.id}) // get id from url
                    getRestaurantById(localStorage.getItem("token"),this.props.match.params.id) // get the restaurant by id
                    .then(res=>{
                        this.setState({ // filled the input with the properties of the restaurant
                            nameRestaurant:res.name,
                            address:res.address,
                            postalCode:res.postalCode,
                            city:res.city,
                            rating:res.ratings,
                            typeFirst:res.types[0],
                            selectedFile:res.image,
                            urlAvatar:`${process.env.REACT_APP_API_NODE}/api/restaurants/userRestaurants/photo/${res._id}`
                        })
                        for(let i=1 ;i<res.types.length;i++){ // We create as many inputs as there are type restaurant
                            this.setState({inputType:[...this.state.inputType,<div style={{display:"flex"}} key={this.state.inputType.length}>
                            <Form.Control type="text" placeholder="Type of Restaurant" className="typeRestaurant" defaultValue={res.types[i]} onChange={this.handleChange} key={this.state.inputType.length}/>
                            <IndeterminateCheckBoxIcon color="primary" style={{margin:"auto"}} onClick={(key)=>this.handleDelete(key)}/>
                            </div>]})
                            
                        }
                    })
                })
            }else{
                this.setState({redirect:true})
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
    
        handleClick=()=>{ // function to add an input in the form for type restaurant
            const myInput = [...this.state.inputType]
            myInput.push(<div style={{display:"flex"}} key={myInput.length}>
            <Form.Control type="text" placeholder="Type of Restaurant" className="typeRestaurant" onChange={this.handleChange} key={myInput.length}/>
            <IndeterminateCheckBoxIcon color="primary" style={{margin:"auto"}} onClick={(key)=>this.handleDelete(key)}/>
            </div>)
            this.setState({inputType:myInput})
        }
    
        handleChange=(event)=>{ // update state when we complete the field
            const {name,value} = event.target
            this.setState({[name]:value})
        }
    
        handleDelete=(key)=>{ // delete input filed
            let myTypes = [...this.state.inputType]
            myTypes.splice(key+1,1)
            this.setState({inputType:myTypes})
        }
    
        geocodeLatLon = (adress,pc,city) =>{ // check if the address is correct and return lat and lng
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
    
        handleSubmit= async(event)=>{ // submit form
            event.preventDefault()
            const myTypes = document.getElementsByClassName("typeRestaurant")
            const typesRestaurant = [...this.state.types]

            const data = new FormData() // variable with our file

            if(this.state.selectedFile != null){
                data.append('myImage', this.state.selectedFile)
            }
    
            Object.keys(myTypes)
            .forEach(key=>{
                typesRestaurant.push(myTypes[key].value)
            })
            this.setState({types:typesRestaurant})
    
            const latLng = await this.geocodeLatLon(this.state.address,this.state.postalCode,this.state.city)
    
            if(latLng===undefined){
               return this.setState({alert:true,notif:<Alert severity="error">We don't find your address, please retry!</Alert>})
            }
    
            const restaurant = {
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
                types:this.state.types,
            }

            data.append('restaurant', JSON.stringify(restaurant))
    
            updateRestaurant(data,this.state.idRestaurant,localStorage.getItem("token"))
            .then(res=>{
                if(res===404){
                    this.setState({alert:true,notif:<Alert severity="error">Restaurant not found</Alert>})
                }else if(res===500){
                    this.setState({alert:true,notif:<Alert severity="error">The address is already occuped by a other restaurant</Alert>})
                }
                else{
                    this.setState({alert:true,notif:<Alert severity="success">Restaurant updated</Alert>})
                }
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
                    typeFirst={this.state.typeFirst}
                    types={this.state.types}
                    alert={this.state.alert}
                    notif={this.state.notif}
                    idRestaurant={this.state.idRestaurant}
                    redirect={this.state.redirect}
                    urlAvatar={this.state.urlAvatar}
                    onChangeHandler={this.onChangeHandler}
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

export default withUpdateRestaurant