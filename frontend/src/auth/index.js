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

exports.isAuth=(req,res,next)=>{
console.log(req.profile._id);
console.log(req.auth._id);
 let user = req.profile && req.auth && req.profile._id == req.auth._id;

  if(!user){
    return res.status(403).json({error:"Access denied"});
  }
  next();
};
