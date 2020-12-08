import React,{Component} from "react"
import AppBar from "../AppBar/appBar"
import { makeStyles } from '@material-ui/core/styles';
import imgBackground from "../../img/background-user.jpg"

import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
        margin:"auto",
        width: theme.spacing(15),
        height: theme.spacing(15),
    },
  }));

const Profil =() =>{
    const classes = useStyles();

        return(
            <> 
{/*                 <AppBar/> */}
                <section style={{width:"100%",height:"100%"}}>
                    <div style={{backgroundImage:`url(${imgBackground})`,height: "50%",display:"flex"}}>
                        <figure className={classes.root} style={{margin:"auto",flexDirection: "column"}}>
                            <Avatar alt="Remy Sharp" src="http://localhost:5000/api/auth/meAvatar/5fcfccf582eb2764ba639bc3" className={classes.large} />
                            <figcaption style={{textAlign:"center"}}>
                                <h2 style={{color:"white"}}>Imrane Abdoul</h2>
                                <h2 style={{color:"white"}}>Age : 24 ans</h2>
                                <h3 style={{color:"white"}}>Email : imraneabdoul.pro@gmail.com</h3>
                            </figcaption>
                        </figure>
                    </div>
                </section>
            </>
        )
}

export default Profil