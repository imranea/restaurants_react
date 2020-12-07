import React,{Component} from "react"
import AppBar from "../AppBar/appBar"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './form.css'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import withUpdateRestaurant from "../../hoc/withUpdateRestaurant"


const UpdateRestaurant = (props)=>{
        return(
        <> 
            {/* <AppBar/> */}
            <h1 style={{textAlign:"center"}}>Update Restaurant</h1>
            <div className="myFormRestaurant">
                <Form onSubmit={props.handleSubmit}>
                    {
                        props.alert?
                        props.notif
                        :
                        <span></span>
                    }
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name Restaurant</Form.Label>
                        <Form.Control type="text" name="nameRestaurant" placeholder="Enter name of the Restaurant" value={props.nameRestaurant} onChange={props.handleChange} required/>
                    </Form.Group>

                    <Form.Group controlId="formBasicAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" name="address" placeholder="Address" value={props.address} onChange={props.handleChange} required/>
                    </Form.Group>
                    <Form.Group controlId="formBasicAddress">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control type="text" name="postalCode" placeholder="Postal Code" value={props.postalCode} onChange={props.handleChange} required/>
                    </Form.Group>
                    <Form.Group controlId="formBasicAddress">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" name="city" placeholder="City" value={props.city} onChange={props.handleChange} required/>
                    </Form.Group>
                    <Form.Group controlId="formBasicRating">
                        <Form.Label>Ratings</Form.Label>
                        <Form.Control type="number" name="rating" placeholder="Rating" value={props.rating} onChange={props.handleChange} min="0" max="5" required/>
                    </Form.Group>
                    <Form.Group controlId="formBasicType">
                        <Form.Label>Type</Form.Label>
                        <Form.Control type="text" name="typeFirst" placeholder="Type of Restaurant" className="typeRestaurant" value={props.typeFirst} onChange={props.handleChange} key="0" required/>
                        {
                            props.inputType
                        }
                    </Form.Group>
                    <div>
                    <AddCircleIcon color="primary" style={{cursor:"pointer"}} onClick={props.handleClick}/>
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

const WrappedComponent = withUpdateRestaurant(UpdateRestaurant)

export default WrappedComponent