import React,{Component} from "react"
import AppBar from "../AppBar/appBar"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './form.css'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import withRestaurantAdmin from "../../hoc/withRestaurantAdmin"

const RestaurantAdmin =(props)=>{ // Component Form Restaurant

        return(
            <> 
            <AppBar/>
            <h1 style={{textAlign:"center"}}>Create Restaurant</h1>
            <div className="myFormRestaurant">
                <Form onSubmit={props.handleSubmit}>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name Restaurant</Form.Label>
                        <Form.Control type="text" name="nameRestaurant" placeholder="Enter name of the Restaurant" value={props.nameRestaurant} onChange={props.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" name="address" placeholder="Address" value={props.address} onChange={props.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicRating">
                        <Form.Label>Ratings</Form.Label>
                        <Form.Control type="number" name="rating" placeholder="Rating" value={props.rating} onChange={props.handleChange} min="0" max="5"/>
                    </Form.Group>
                    <Form.Group controlId="formBasicType">
                        <Form.Label>Type</Form.Label>
                        <Form.Control type="text" placeholder="Type of Restaurant" className="typeRestaurant"/>
                        {
                        Object.keys(props.type)
                        .map(key=>{
                            return(
                                <div style={{display:"flex"}} key={key}>
                                {<Form.Control type="text" placeholder="Type of Restaurant" className="typeRestaurant" key={key}/>}
                                <IndeterminateCheckBoxIcon color="primary" style={{margin:"auto"}} onClick={props.handleDelete}/>
                                </div>
                            )
                        })
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