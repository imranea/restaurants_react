import React from "react"
import "./NotFound.css"
import Button from '@material-ui/core/Button';
import {NavLink} from "react-router-dom"

const NotFound = () => {
    return(
        <div className="divOops">
            <div style={{textAlign:"center"}}>
                <h1 className="oops">Oops !</h1>
                <h2>404 - Page Not Found</h2>
                <p>The page you are looking for might have been removed had it's name changed or is temporarily unavailable</p>
                <NavLink to="/" className="buttonOops">
                    <Button variant="contained" color="primary">
                        Go to Home Page
                    </Button>
                </NavLink>
            </div>
        </div>
    )
}

export default NotFound