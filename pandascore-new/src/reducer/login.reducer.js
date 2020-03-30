import { userConstant } from '../constant/user.constant';
export default function loginreducer(state = {}, action) {
    console.log("Data comes in login reducer component", action);

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