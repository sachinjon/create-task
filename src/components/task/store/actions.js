import {CREATE_TASK,DELETE_TASK,UPDATE_TASK} from './actionTypes';
import axios from 'axios';

const baseURL=process.env.REACT_APP_SERVICE_BASE_URL;

const createTask=(data)=>{
    return {
        type:CREATE_TASK,
        payload:data
    }
}

export const createTaskAction=(reqObj)=>{
  return async dispatch=>{
       try {
           const data=await axios.post(`${baseURL}/task/create`,reqObj);
           dispatch(createTask(data));
       } catch (error) {
        dispatch(createTask(error));
       } 
  }
}
const deleteTask=(data)=>{
    return {
        type:DELETE_TASK,
        payload:data
    }
}

export const deleteTaskAction=(reqObj)=>{
  return async dispatch=>{
       try {
           const data=await axios.post(`${baseURL}/task/delete`,reqObj);
           dispatch(deleteTask(data));
       } catch (error) {
        dispatch(deleteTask(error));
       } 
  }
}
const updateTask=(data)=>{
    return {
        type:UPDATE_TASK,
        payload:data
    }
}

export const updateTaskAction=(reqObj)=>{
  return async dispatch=>{
       try {
           const data=await axios.post(`${baseURL}/task/update`,reqObj);
           dispatch(updateTask(data));
       } catch (error) {
        dispatch(updateTask(error));
       } 
  }
}
