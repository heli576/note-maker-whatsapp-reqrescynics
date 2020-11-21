import React,{useState,useEffect} from "react";
import {isAuthenticated,getPinNotes} from "../auth";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Navbar from "../components/Navbar";
import {Link} from "react-router-dom";
import moment from "moment";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from "@material-ui/core/Grid";
import Bg from "../images/bg.png";


const useStyles = makeStyles((theme) => ({
heading:{
  marginTop:70,
  textAlign:"center",
  fontSize:30
},
icon:{
  textAlign:"right"
},
wanote: {
    width: 500,
    margin:20,
    padding:"30px 30px 10px 30px",
  backgroundColor:"#e2ffc7"
  },
  mesnote: {
      width: 500,
      margin:20,
      padding:"30px 30px 10px 30px",
    //backgroundColor:"#0a7af9"
    },
    meslink:{
      color:"#0099cc",
      fontSize:20
    },
    walink:{
      color:"#0099cc",
      fontSize:20,
    },
    mestext:{
      //color:"#0a7af9"
    },
  title: {
    fontSize: 14,
  },
  pos: {
    marginTop:20,
    textAlign:"right"
  },
  subheading:
  {
    width: '100%',
    backgroundColor: "white",
    position:'relative',
    top:'-7px',
    padding:'5px'
  }

}));

const PinnedNotes=()=>{
const classes = useStyles();
const [pinnedNotes,setPinnedNotes]=useState([]);
const {user:{_id,username}}=isAuthenticated();
  const token = isAuthenticated().token;

const loadPinnedNotes=(userId,token)=>{
  getPinNotes(userId,token).then(data=>{
    if(data.error){
      console.log(data.error);
    }else{
      setPinnedNotes(data);
    }
  })
}


useEffect(()=>{
  loadPinnedNotes(_id,token);
},[]);

const downloadButton = <div className = 'downloadButton'>
<i className="lni lni-download"></i>
Download File
</div>

const showPinnedNotes=pinnedNotes=>{
  return(
    <div>
    <Grid container>
    <Grid item sm/>
    <Grid item sm>
    {
      pinnedNotes.slice(0).reverse().map((h,i)=>{
        if(h.source==="whatsapp"){
          if(h.isAttachment==="true"){
            return(
              <div id={h._id}>
              <Card className={classes.wanote} variant="outlined">


                  <CardContent>
                  <CardActions>
               <a href={h.noteText} target="_blank" className={classes.walink}>{downloadButton}</a>
             </CardActions>
                  <Typography className={classes.pos} color="textSecondary">
                       {moment(h.createdAt).fromNow()}
                     </Typography>
                   </CardContent>
                 </Card>
              </div>
            )
          }else{
            return(
              <div id={h._id}>
              <Card className={classes.wanote} variant="outlined">
                   <CardContent>
                    <Typography variant="h6">
                       {h.noteText}
                     </Typography>
                     <Typography className={classes.pos} color="textSecondary">
                       {moment(h.createdAt).fromNow()}
                     </Typography>
                   </CardContent>
                 </Card>
              </div>
            )
          }
        }else{
          if(h.isAttachment==="true"){
            return(
              <div id={h._id}>
              <Card className={classes.mesnote} variant="outlined">

                  <CardContent>
                  <CardActions>
               <a href={h.noteText} target="_blank"className={classes.meslink}>{downloadButton}</a>
             </CardActions>
                  <Typography className={classes.pos} color="textSecondary">
                       {moment(h.createdAt).fromNow()}
                     </Typography>
                   </CardContent>
                 </Card>
              </div>
            )
          }else{
            return(
              <div id={h._id}>
              <Card className={classes.mesnote} variant="outlined">
                   <CardContent>

                    <Typography variant="h6" className={classes.mestext}>
                       {h.noteText}
                     </Typography>

                     <Typography className={classes.pos} color="textSecondary">
                       {moment(h.createdAt).fromNow()}
                     </Typography>
                   </CardContent>
                 </Card>
              </div>
            )
          }
        }

    })}

    </Grid>
    <Grid item sm/>
    </Grid>

    </div>
  )
}

return (<div style={{backgroundImage:`url(${Bg})`,width: '100vw',height: '100%'}}>
    <Navbar/>
  <div>


  <Typography className={classes.heading} color="primary" gutterBottom>
<div className={classes.subheading}>Your Bookmarked Notes</div>
  </Typography>
{showPinnedNotes(pinnedNotes)}
  </div>
  </div>
);
}

export default PinnedNotes;
