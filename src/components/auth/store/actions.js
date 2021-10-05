import {LOGIN_USER,SIGNUP_USER} from './actionTypes';
import axios from 'axios';

const baseURL=process.env.REACT_APP_SERVICE_BASE_URL;

const userLogin=(data)=>{
    return {
        type:LOGIN_USER,
        payload:data
    }
}

export const userLoginAction=(reqObj)=>{
  return async dispatch=>{
       try {
           const data=await axios.post(`${baseURL}/auth/login`,reqObj);
           dispatch(userLogin(data));
       } catch (error) {
        dispatch(userLogin(error));
       } 
  }
}
const userSignUp=(data)=>{
    return {
        type:SIGNUP_USER,
        payload:data
    }
}

export const userSignUpAction=(reqObj)=>{
  return async dispatch=>{
       try {
           const data=await axios.post(`${baseURL}/auth/signup`,reqObj);
           dispatch(userSignUp(data));
       } catch (error) {
        dispatch(userSignUp(error));
       } 
  }
}
