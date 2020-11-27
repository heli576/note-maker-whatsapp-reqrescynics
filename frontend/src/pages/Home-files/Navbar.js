import React,{Fragment} from "react";
import {Link,withRouter} from "react-router-dom";
import {signout,isAuthenticated} from "../../auth";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  navlink:{
    textDecoration:"none",
    color:"#fff"
  }

}));

const Navbar=({history})=>{
  const classes = useStyles();
return (
  <div>
  <AppBar position="fixed">
    <Toolbar className="nav-container">
    {isAuthenticated()?(
    <Fragment>
    <Button color="inherit" component={Link} to="/pinnednotes">Pinned Notes</Button>
    <Button color="inherit"  onClick={() =>signout(() => {
       history.push("/");
     })}>Logout</Button>
    </Fragment>

  ):(
    <Fragment>
    <Button color="inherit" component={Link} to="/login">Login</Button>
    {/* <Button color="inherit" component={Link} to="/">Home</Button> */}
    <Button color="inherit"><a href="https://api.whatsapp.com/send/?phone=%2B14155238886&text=join+great-since&app_absent=0" target="_blank"  className={classes.navlink}>Signup</a> </Button>
    </Fragment>
  )}
    </Toolbar>
    </AppBar>
    </div>
  );
}



export default withRouter(Navbar);
