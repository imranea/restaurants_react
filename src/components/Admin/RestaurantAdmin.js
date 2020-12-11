import React from "react"
import AppBar from "../AppBar/appBar"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './form.css'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';
import withRestaurantAdmin from "../../hoc/withRestaurantAdmin"


const RestaurantAdmin =(props)=>{ // Component Form Restaurant

        return(
            <> 
            <AppBar authentificate={props.redirect}/>
            <h1 style={{textAlign:"center"}}>Create Restaurant</h1>
            <div className="myFormRestaurant">
                <Form onSubmit={props.handleSubmit}>
                {props.error?
                    props.notif
                :
                    <span></span>
                }
                <input accept="image/*" style={{display:"none"}} id="icon-button-file" type="file" name="myImage" onChange={props.onChangeHandler}/>
                    <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera />
                        </IconButton>
                    </label>
                <img id="uploadAvatar" src={props.urlAvatar} alt=""/>
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
                        <Form.Control type="text" placeholder="Type of Restaurant" className="typeRestaurant" key="0" required/>
                        {
                            props.inputType
                        }
                    </Form.Group>
                    <div>
                    <AddCircleIcon color="primary" onClick={props.handleClick} style={{cursor:"pointer"}}/>
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

const WrappedComponent = withRestaurantAdmin(RestaurantAdmin)

export default WrappedComponent