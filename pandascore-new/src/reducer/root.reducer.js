import loginreducer from "../reducer/login.reducer";
import getAllDetail from './adminUserListReducer'
import { combineReducers } from "redux";
export default combineReducers({
    loginreducer,
    getAllDetail
})