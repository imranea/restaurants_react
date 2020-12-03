import React,{useState} from "react"
import AppBar from "../AppBar/appBar"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './form.css'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';

const RestaurantAdmin =()=>{ // Component Form Restaurant

    const [type,setType]=useState([]) // state to add input type

    const [properties,setProperties]=useState({ // properties of the restaurant
        nameRestaurant:"",
        address:"",
        rating:0,
        types:[]
    })

    const handleChange = (event) =>{  // function handle change the state dependind the fiel update
        const {name,value} = event.target
        let myProperties = {...properties}
        switch(name){
            case "nameRestaurant":
                myProperties.nameRestaurant=value
                break;
            case "address":
                myProperties.address=value
                break;
            case "rating":
                myProperties.rating=value
                break;
            default:
                console.log("nothing")

        }
        setProperties(myProperties)
    }

    const handleClick=()=>{  // add a input tag
        let myType = [...type]
        myType.push("input")
        setType(myType)
    }

    const handleDelete=(key)=>{ // delete a input type tag
        let myType = [...type]
        myType.splice(key,1)
        //console.log(myType)
        setType(myType)
    }

    const handleSubmit=(event)=>{
        event.preventDefault()
        let typesRestaurants = {...properties}
        let myTypes = document.getElementsByClassName('typeRestaurant')
        Object.keys(myTypes)
        .forEach(key=>{
            typesRestaurants.types.push(myTypes[key].value)
        })
        setProperties(typesRestaurants)
    }
    return(
            <> 
            <AppBar/>
            <h1 style={{textAlign:"center"}}>Create Restaurant</h1>
            <div className="myFormRestaurant">
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name Restaurant</Form.Label>
                        <Form.Control type="text" name="nameRestaurant" placeholder="Enter name of the Restaurant" value={properties.nameRestaurant} onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" name="address" placeholder="Address" value={properties.address} onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicRating">
                        <Form.Label>Ratings</Form.Label>
                        <Form.Control type="number" name="rating" placeholder="Rating" value={properties.rating} onChange={handleChange} min="0" max="5"/>
                    </Form.Group>
                    <Form.Group controlId="formBasicType">
                        <Form.Label>Type</Form.Label>
                        <Form.Control type="text" placeholder="Type of Restaurant" className="typeRestaurant"/>
                        {
                        Object.keys(type)
                        .map(key=>{
                            return(
                                <div style={{display:"flex"}} key={key}>
                                {<Form.Control type="text" placeholder="Type of Restaurant" className="typeRestaurant" key={key}/>}
                                <IndeterminateCheckBoxIcon color="primary" style={{margin:"auto"}} onClick={handleDelete}/>
                                </div>
                            )
                        })
                    }
                    </Form.Group>
                    <div>
                    <AddCircleIcon color="primary" onClick={handleClick} style={{cursor:"pointer"}}/>
                    Add Type
                    </div><br/>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </>
        )
}

export default RestaurantAdmin