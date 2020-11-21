export default {
  palette:{
    primary:{
      light:"#e2ffc7",
      main:"#075e55",
      //dark:"#FF0000",
      contrastText:"#fff"
    },
    secondary:{
      main:"#a108ff",
      contrastText:"#fff"
    }
  },

  spreadThis:{
  typography:{
    useNextVariants:true
  },
  form:{
    textAlign:"center"
  },
  pageTitle:{
    margin:"5px auto",

  },
  textField:{
    margin:"5px auto",
  },
  button:{
    marginTop:20,
    position:"relative"
  },
  customError:{
    color:"red",
    fontSize:"0.9rem",
    marginTop:5
  },
  progress:{
    position:"absolute"
  },
  invisibleSeparator:{
    border:"none",
    margin:4
  },
  visibleSeparator:{
    width:"100%",
    borderBottom:"1px solid rgba(0,0,0,1)",
    marginBotton:20
  },
  paper:{
    padding:20,
    marginLeft:100,
    marginRight:20

  },
  profile:{
    "& .image-wrapper":{
      textAlign:"center",
      position:"relative",
      "& button":{
        position:"absolute",
        top:"80%",
        left:"70%"
      }

    },
    "& .profile-image":{
      width:200,
      height:200,
      objectFit:"cover",
      maxWidth:"100%",
      borderRadius:"50%"
    },
    "& .profile-details":{
      textAlign:"center",
      "& span,svg":{
        verticalAlign:"middle"
      },
      "& a":{
        color:"#9c27b0"
      }
    },
    "& hr":{
      border:"none",
      margin:"0 0 10px 0"
    },
    "& svg.button":{
      "&:hover":{
        cursor:"pointer"
      }
    }
  },
  buttons:{
    textAlign:"center",
    "& a":{
      margin:"20px 10px"
    }
  }
}

}
