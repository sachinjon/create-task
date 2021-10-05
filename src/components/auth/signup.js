import React,{useState,useEffect} from 'react'
import {userSignUpAction} from './store/actions';
import {useDispatch,useSelector} from 'react-redux';


const Signup=(props)=>{
 
    const dispatch=useDispatch();
const dispatcheduserAction=(credentials)=>dispatch(userSignUpAction(credentials));


const [credentials,setCredentials]=useState({username:"",password:"",confpassword:""});
const signUpInfo=useSelector(state=>state.auth.signUpInfo);

useEffect(()=>{
    console.log(signUpInfo)
    if(signUpInfo && signUpInfo.data[0].success){
        alert(signUpInfo.data[0].message)
        props.history.push("/login");
    } 
},[signUpInfo])

const userLogin=(e)=>{
    e.preventDefault();
    console.log(credentials);
    dispatcheduserAction(credentials);
}

 return (
    <form onSubmit={userLogin}>
    <div className="imgcontainer"><h2>Sign up</h2>
    </div>
    
    <div className="container">
      <label for="uname"><b>Username</b></label>
      <input 
      type="text" 
      name="username" 
      value={credentials.username}
       onChange={(e)=>{setCredentials({...credentials,username:e.target.value})}}
        placeholder="Enter Username"  required/>
    
      <label for="psw"><b>Password</b></label>
      <input  type="password" 
               name="password" 
               value={credentials.password}
                onChange={(e)=>{setCredentials({...credentials,password:e.target.value})}}
                 placeholder="Enter Password" 
                  required/>
       <label for="psw"><b>Confirm Password</b></label>
      <input  type="password" 
               name="confpassword" 
               value={credentials.confpassword}
                onChange={(e)=>{setCredentials({...credentials,confpassword:e.target.value})}}
                 placeholder="Enter confirm Password" 
                  required/>           
          
      <button type="submit">Signup</button>
      <span className="psw"> <a href="/login">Login</a></span>
    </div>
    </form>
 )
}
export default Signup;