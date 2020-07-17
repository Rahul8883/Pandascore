import { userConstant } from '../constant/user.constant';
/**
 * 
 * @param {state} state this is previous state 
 * @param {action} action  and this is action to be provide in reducer to update the state and send back to component
 */
export default function adminUserListReducer(state = { userlist: false, user: [] }, action) {
    switch (action.type) {
        case userConstant.GET_USER_DETAIL_SUCCESS:
            return {
                userList: true,
                user: action.user
            }

        case userConstant.GET_USER_DETAIL_FAILURE:
            return {
                userList: false
            }
        default:
            return {
                state
            }
    }
}