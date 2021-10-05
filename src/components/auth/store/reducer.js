import {LOGIN_USER,SIGNUP_USER} from './actionTypes';
const initState={
    userInfo:null,
    signUpInfo:null
}

const reducer=(state=initState,action)=>{
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,userInfo:action.payload
            }
        case SIGNUP_USER:
            return {
                ...state,signUpInfo:action.payload
            }
        default:
        return state;
    }
}

export default reducer;