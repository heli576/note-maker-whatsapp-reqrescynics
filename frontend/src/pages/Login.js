import React,{useState} from "react";
import {Redirect} from "react-router-dom";
import {signin,authenticate,isAuthenticated} from "../auth";

//MUI imports
import Navbar from "../components/Navbar";
import Logo from "../images/logo.png";
import {Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Bg from "../images/bg.png";

const useStyles = makeStyles((theme) => ({
...theme.spreadThis,
navlink:{
  textDecoration:"none",
  color:"#000"
},
textField:{
  [theme.breakpoints.down('sm')]: {
   width:"85%",
   margin:"5px auto"
 },
  [theme.breakpoints.up('md')]: {
    margin:"5px auto",
    width:"100%"
  }
},
paper:{
marginTop:120,
  padding:40,
  [theme.breakpoints.down('sm')]: {
   margin:"80px 20px 0 20px"
 }
},
logo:{
  height:80,
  width:80,
  marginTop:-50
}
}));

const Login=()=>{
  document.getElementsByTagName('body')[0].style.backgroundImage = 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")'
  const classes = useStyles();

 const [values,setValues]=useState({
   username:"",
   password:"",
   error:"",
   loading:false,
   redirectToReferrer:false
 });

 const {username,password,error,loading,redirectToReferrer}=values;
const {user}=isAuthenticated();
const handleChange=(name)=>(event)=>{
  setValues({...values,error:false,[name]:event.target.value});
};

const handleSubmit=(event)=>{
  event.preventDefault()
  setValues({...values,error:false,loading:true});
  signin({username,password})
  .then(data=>{
    if(data.error){
      setValues({...values,error:data.error,loading:false})
    }else{
    authenticate(data,()=>{
      setValues({
        ...values,
        redirectToReferrer:true,
      });
    });
    }
  });
};

const signInForm=()=>(
    <div>
    <Grid container className={classes.form}>
    <Grid item sm/>
    <Grid item sm>
<Paper className={classes.paper}>
  <img src={Logo} alt="logo" className={classes.logo}/>
    <Typography variant="h4" className={classes.pageTitle}>Login</Typography>
   <form noValidate onSubmit={handleSubmit}>
    <TextField
    id="username"
    name="username"
    type="text"
    label="Username"
    className={classes.textField}
value={username}
    onChange={handleChange("username")}
    fullWidth/>
    <TextField
    id="password"
    name="password"
    type="password"
    label="Password"
    className={classes.textField}
    value={password}
    onChange={handleChange("password")}
    fullWidth/>
  {showError()}
    <Button
    type="submit"
    variant="contained"
    color="primary"
    className={classes.button}
    disabled={loading}>Login
    {showLoading()}
    </Button>
    <br />
    <small>Don't have an account? Signup <a href="https://api.whatsapp.com/send/?phone=%2B14155238886&text=join+thirty-applied" target="_blank"  className={classes.navlink}>here</a></small>
    </form>
      </Paper>
    </Grid>
    <Grid item sm/>
    </Grid>
    </div>
);

const showError=()=>{
  if(error){
    return(
      <Typography variant="body2" className={classes.customError}>
    {error}
      </Typography>
    )
  }
};

const redirectUser=()=>{
  if(redirectToReferrer){
  if(user){
      return <Redirect to="/notes"/>
  }
  }
  if(isAuthenticated())
  {
    return <Redirect to="/"/>
  }
}

const showLoading=()=>
loading&&(<CircularProgress size={20} className={classes.progress}/>);


  return(

  <div style={{backgroundImage:`url(${Bg})`,width: '100vw',height: '100vh'}}>
      <Navbar/>
      <div>
{signInForm()}
{redirectUser()}
</div>
</div>
  )
}


export default Login;
