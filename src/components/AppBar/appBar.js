import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {getProfile,logOutUser} from "../UserFunction"
import {Redirect,NavLink} from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [auth, setAuth] = useState(false);
  const [redirect,setRedirect] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () =>{
    logOutUser(localStorage.getItem('token'))
    .then(res=>{
      if(res){
        localStorage.clear()
        setRedirect(true)
      }
    })
  }

  if(localStorage.getItem('token')){ // if token is present , redirect to map
    getProfile(localStorage.getItem('token')) // function from UserFunction.js
    .then(res=>{
        if(res){
            setAuth(res)
        }
    })
  }  

  if(redirect){ // if token is null, redirect to login page
    return (
      <Redirect to="/" />
    )
  } 

  return (
    <div className={classes.root} data-test="component-appBar">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Restart Trade
          </Typography>
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <NavLink style={{textDecoration:"none"}} to="/profil">
                  <MenuItem onClick={handleClose}>My Profil</MenuItem>
                </NavLink>
                <NavLink style={{textDecoration:"none"}} to="/addRestaurant">
                  <MenuItem onClick={handleClose}>Add Restaurant</MenuItem>
                </NavLink>
                <MenuItem onClick={logOut} style={{color:"#007bff"}}>Log out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
