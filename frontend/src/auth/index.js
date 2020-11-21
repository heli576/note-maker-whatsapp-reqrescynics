import {API} from "../config";

 /*export const signup=(user)=>{
  return fetch(`${API}/signup`,{
    method:"POST",
    headers:{
      Accept:"application/json",
      "Content-Type":"application/json"
    },
    body:JSON.stringify(user)
  })
  .then(response=>{
    return response.json()
  })
  .catch(err=>{
    console.log(err);
  })
};*/

export const signin=(user)=>{
 return fetch(`${API}/signin`,{
   method:"POST",
   headers:{
     Accept:"application/json",
     "Content-Type":"application/json"
   },
   body:JSON.stringify(user)
 })
 .then(response=>{
   return response.json()
 })
 .catch(err=>{
   console.log(err);
 })
};

export const authenticate=(data,next)=>{
  if(typeof window!=="undefined"){
    localStorage.setItem("jwt",JSON.stringify(data))
    next();
  }
};

export const signout=(next)=>{
  if(typeof window!=="undefined"){
    localStorage.removeItem("jwt");
    next();
    return fetch(`${API}/signout`,{
      method:"GET",

    })
    .then(response=>{
      console.log("signout",response);
    })
    .catch(err=>{
      console.log(err);
    })
  }
};

export const isAuthenticated=()=>{
  if(typeof window=="undefined"){
    return false
  }
  if(localStorage.getItem("jwt")){
    return JSON.parse(localStorage.getItem("jwt"));
  }else{
    return false;
  }
};

export const getNotes = (userId, token) => {
    return fetch(`${API}/notes/by/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const deleteNote = (noteId,userId,token) => {
    return fetch(`${API}/note/${noteId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },

    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const appendPinNote = (noteId,userId,token) => {
    return fetch(`${API}/pinnote/${noteId}/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },

    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getPinNotes = (userId, token) => {
    return fetch(`${API}/pinnotes/by/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
