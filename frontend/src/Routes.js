import React from "react";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import './App.css';

//import material-ui theme file
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "./util/theme";

//import pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Notes from "./pages/Notes";
import PinnedNotes from "./pages/PinnedNotes";

//create theme file
const theme=createMuiTheme(themeFile);

//Routes function
const Routes=()=>{
  return(
    <MuiThemeProvider theme={theme}>
      <Router>
     <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/login" exact component={Login}/>
      <Route path="/notes" exact component={Notes}/>
      <Route path="/pinnednotes" exact component={PinnedNotes}/>
  </Switch>
    </Router>
    </MuiThemeProvider>

  )
}

export default Routes;
