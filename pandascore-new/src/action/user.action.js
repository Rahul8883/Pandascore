import { userConstant } from '../constant/user.constant';
import { userService } from '../service/user.services';
export const userAction = {
    login,
    getAllData
}

function login(data) {
    console.log(" Login data in action", data);
    return dispatch => {
        userService.login(data)
            .then(user => {
                    console.log("response of login", user.data.id);
                    const pandascoreToken = "puqITtWgHHS9L6eg1UH1ADPlTykKMGXfi-EPqTISzX0Eg1PM1Nw"
                    localStorage.setItem("token", pandascoreToken)
                    dispatch(success(user));
                    window.location.href = '/dashboard'
                        // this.props.history.replace('/main')

                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function success(user) { return { type: userConstant.LOGIN_SUCCESS, user } }

    function failure(error) { return { type: userConstant.LOGIN_FAILURE, error } }
}


function getAllData() {
    return dispatch => {

        userService.getAllData()
            .then(res => {
                    console.log("response of login", res);
                    dispatch(success(res.data));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function success(user) { return { type: userConstant.GET_USER_DETAIL_SUCCESS, user } }

    function failure(error) { return { type: userConstant.GET_USER_DETAIL_FAILURE, error } }
}