import {CREATE_TASK,UPDATE_TASK,DELETE_TASK} from './actionTypes';

const initState={
    createTaskInfo:null,
    deleteTaskInfo:null,
    updateTaskInfo:null
}

const reducer=(state=initState,action)=>{
    switch (action.type) {
        case CREATE_TASK:
            return {
                ...state,createTaskInfo:action.payload
            }
        case DELETE_TASK:
            return {
                ...state,deleteTaskInfo:action.payload
            }
        case UPDATE_TASK:
            return {
                ...state,updateTaskInfo:action.payload
            }
        default:
        return state;
    }
}

export default reducer;