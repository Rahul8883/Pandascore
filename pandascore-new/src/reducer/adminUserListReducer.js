import { userConstant } from '../constant/user.constant';
export default function adminUserListReducer(state = { userlist: false, user: [] }, action) {
    console.log("action data comes in get user details reducer*****", action.user);

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