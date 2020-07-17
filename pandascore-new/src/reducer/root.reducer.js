import loginreducer from "../reducer/login.reducer";
import getAllDetail from './adminUserListReducer'
import { combineReducers } from "redux";
/**
 * this is use to combine all reducer and responed singly to increase the performance
 */
export default combineReducers({
    loginreducer,
    getAllDetail
})