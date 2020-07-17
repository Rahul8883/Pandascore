import { userConstant } from '../constant/user.constant';
/**
 * 
 * @param {state} state this is previous state 
 * @param {action} action  and this is action to be provide in reducer to update the state and send back to component
 */
export default function loginreducer(state = {}, action) {
    switch (action.type) {
        case userConstant.LOGIN_SUCCESS:
            return {
                logIn: true,
                user: action.data
            }
        case userConstant.LOGIN_FAILURE:
            return {
                logIn: false
            }
        default:
            return {
                state
            }
    }
}