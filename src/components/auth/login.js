import React,{useState,useEffect} from 'react'
import {userLoginAction} from './store/actions';
import {useDispatch,useSelector} from 'react-redux';


const Login=(props)=>{
const dispatch=useDispatch();
const dispatcheduserAction=(credentials)=>dispatch(userLoginAction(credentials));


const [credentials,setCredentials]=useState({username:"",password:""});
const loginInfo=useSelector(state=>state.auth.userInfo);

useEffect(()=>{
    console.log(loginInfo);
    if(loginInfo && loginInfo.data && loginInfo.data[0].success){
        props.history.push("/task");
    }
},[loginInfo])

const userLogin=(e)=>{
    e.preventDefault();
    console.log(credentials);
    dispatcheduserAction(credentials);
}

 return (
    

<form onSubmit={userLogin}>
<div className="imgcontainer"><h2>Login</h2>
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
      
  <button type="submit">Login</button>
  <span className="psw"> <a href="/signup">Signup User=></a></span>
</div>
</form>
 )
}
export default Login;