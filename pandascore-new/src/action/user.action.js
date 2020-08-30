import { userConstant } from '../constant/user.constant';
import { userService } from '../service/user.services';
export const userAction = {
        login,
        getAllData
    }
    /**
     * <Login function>
     * @param {data} data this is login data which we are entering.
     */
function login(data) {
    console.log(" Login data in action", data);
    return dispatch => {
        userService.login(data)
            .then(user => {
                    const pandascoreToken = "puqITtWgHHS9L6eg1UH1ADPlTykKMGXfi-EPqTISzX0Eg1PM1Nw"
                    localStorage.setItem("token", pandascoreToken)
                    dispatch(success(user));
                    window.location.href = '/dashboard'

                },
                error => {
                    dispatch(failure(error));
                }
            );
    };
    /**
     * 
     * @param {user} user  when login is successfully loged in then this function will call
     */
    function success(user) { return { type: userConstant.LOGIN_SUCCESS, user } }

    /**
     * 
     * @param {user} user  when login is failed in then this function will call
     */

    function failure(error) { return { type: userConstant.LOGIN_FAILURE, error } }
}

/**
 * <getAllData is call for get all data from backed to action>
 */
function getAllData() {
    return dispatch => {

        userService.getAllData()
            .then(res => {
                    dispatch(success(res.data));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };
    /**
     * 
     * @param {user} user backend api heat successful this is function will call
     */
    function success(user) { return { type: userConstant.GET_USER_DETAIL_SUCCESS, user } }

    /**
     * 
     * @param {user} user backend api heat fail this is function will call
     */

    function failure(error) { return { type: userConstant.GET_USER_DETAIL_FAILURE, error } }
}