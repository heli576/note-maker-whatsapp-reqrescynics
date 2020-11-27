import React,{useState,useEffect} from "react";
import {isAuthenticated,getNotes,deleteNote,appendPinNote} from "../auth";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Navbar from "../components/Navbar";
import {Link} from "react-router-dom";
import moment from "moment";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import DeleteIcon from '@material-ui/icons/Delete';
import { red } from '@material-ui/core/colors';
import Bg from "../images/bg.png";
import Pdf from "react-to-pdf";
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

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
    //backgroundColor: "white",
    position:'relative',
    top:'-7px',
    padding:'5px'
  }

}));

const Notes=()=>{
  document.getElementsByTagName('body')[0].style.backgroundImage = 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")'

const classes = useStyles();
const [history,setHistory]=useState([]);
const {user:{_id,username}}=isAuthenticated();
  const token = isAuthenticated().token;

  let MyRefs = [];

const loadNotes=(userId,token)=>{
  getNotes(userId,token).then(data=>{
    if(data.error){
      console.log(data.error);
    }else{
      setHistory(data);
    }
  })
}



  const destroy=(noteId)=>{
  const userId=isAuthenticated().user._id;
  deleteNote(noteId,userId,token).then(data=>{
    document.getElementById(noteId).style.transition= 'all 0.5s'
    document.getElementById(noteId).style.transform= 'scale(0)'
    document.getElementById(noteId).style.opacity= '0'
    setTimeout(() => {
      document.getElementById(noteId).style.display = 'none'

    }, 500);

      loadNotes();

  })
}

const addPinNotes=(noteId)=>{
  const userId=isAuthenticated().user._id;
  appendPinNote(noteId,userId,token);
}



useEffect(()=>{
  loadNotes(_id,token);
});

const downloadButton = <div className = 'downloadButton'>
<i className="lni lni-download"></i>
Download File
</div>

const showHistory=history=>{
  return(
    <div>
    <Grid container>
    <Grid item sm/>
    <Grid item sm>
    {
      history.slice(0).reverse().map((h,i)=>{
        const ref = React.createRef();
                MyRefs.push(ref);
        if(h.source==="whatsapp"){
          if(h.isAttachment==="true"){
            return(
              <div id={h._id} className="notecard" ref={ref}>
              <Card className={classes.wanote} variant="outlined">


                  <CardContent>
                  <div className={classes.icon} >
                  <Tooltip title="Bookmark">
                  <IconButton onClick={() => addPinNotes(h._id)}>
                  <BookmarksIcon color="primary"/>
                  </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                  <IconButton onClick={() => destroy(h._id)}>
                  <DeleteIcon style={{ color: red[900] }}/>
                  </IconButton>
                  </Tooltip>
                  </div>
                  <CardActions>
               <a href={h.noteText} target="_blank" className={classes.walink}>{downloadButton}</a>
             </CardActions>
                  <Typography className={classes.pos} color="textSecondary">
                  <i className = 'lni lni-whatsapp'></i>
                       {" • "+moment(h.createdAt).fromNow()}
                     </Typography>
                   </CardContent>
                 </Card>
              </div>
            )
          }else{
            return(
              <div id={h._id} className="notecard" >
              <Card className={classes.wanote} variant="outlined">
                   <CardContent>
                   <div className={classes.icon}>
                   <Tooltip title="Bookmark">
                   <IconButton onClick={() => addPinNotes(h._id)}>
                   <BookmarksIcon color="primary"/>
                   </IconButton>
                   </Tooltip>
                   <Tooltip title="Delete">
                   <IconButton onClick={() => destroy(h._id)}>
                   <DeleteIcon style={{ color: red[900] }}/>
                   </IconButton>
                   </Tooltip>
                   <Pdf targetRef={ref} filename="note.pdf">
                          {({ toPdf }) => <Tooltip title="Generate PDF"><IconButton onClick={toPdf}><PictureAsPdfIcon color="primary"/></IconButton></Tooltip>}
                        </Pdf>
                   </div>
                   <div ref={ref} style={{padding:5}}>
                    <Typography variant="h6">
                       {h.noteText}
                     </Typography>
                     </div>
                     <Typography className={classes.pos} color="textSecondary">
                     <i className = 'lni lni-whatsapp'></i>
                       {" • "+moment(h.createdAt).fromNow()}
                     </Typography>
                   </CardContent>
                 </Card>
              </div>
            )
          }
        }else{
          if(h.isAttachment==="true"){
            return(
              <div id={h._id} className="notecard">
              <Card className={classes.mesnote} variant="outlined">

                  <CardContent>
                  <div className={classes.icon}>
                  <Tooltip title="Bookmark">
                  <IconButton onClick={() => addPinNotes(h._id)}>
                  <BookmarksIcon color="secondary"/>
                  </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                  <IconButton onClick={() => destroy(h._id)}>
                  <DeleteIcon style={{ color: red[900] }}/>
                  </IconButton>
                  </Tooltip>
                  </div>
                  <CardActions>
               <a href={h.noteText} target="_blank"className={classes.meslink}>{downloadButton}</a>
             </CardActions>
                  <Typography className={classes.pos} color="textSecondary">
                  <i className = 'lni lni-facebook-messenger'></i>
                       {" • "+moment(h.createdAt).fromNow()}
                     </Typography>
                   </CardContent>
                 </Card>
              </div>
            )
          }else{
            return(
              <div id={h._id} className="notecard">
              <Card className={classes.mesnote} variant="outlined">
                   <CardContent>
                   <div className={classes.icon}>
                   <Tooltip title="Bookmark">
                   <IconButton onClick={() => addPinNotes(h._id)}>
                   <BookmarksIcon color="secondary"/>
                   </IconButton>
                   </Tooltip>
                   <Tooltip title="Delete">
                   <IconButton onClick={() => destroy(h._id)}>
                   <DeleteIcon style={{ color: red[900] }}/>
                   </IconButton>
                   </Tooltip>
                   <Pdf targetRef={ref} filename="note.pdf">
                          {({ toPdf }) => <Tooltip title="Generate PDF"><IconButton onClick={toPdf}><PictureAsPdfIcon color="primary"/></IconButton></Tooltip>}
                        </Pdf>
                   </div>
                   <div ref={ref} style={{padding:5}}>
                    <Typography variant="h6" className={classes.mestext}>
                       {h.noteText}
                     </Typography>
                     </div>

                     <Typography className={classes.pos} color="textSecondary">
                       <i className = 'lni lni-facebook-messenger'></i>
                       {" • "+moment(h.createdAt).fromNow()}
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

return (<div>
    <Navbar/>
  <div>


  <Typography className={classes.heading} color="primary" gutterBottom>
<div className={classes.subheading}>
  Your Notes</div>
  </Typography>

{showHistory(history)}
  </div>
  </div>
);
}

export default Notes;
