import axios from 'axios'
// import authService from '../configuration/user.config';
export const userService = {
    login,
    getAllData
}
const fundooUrl = "http://fundoonotes.incubation.bridgelabz.com/api";
const baseURL = "https://api.pandascore.co/lol/champions?token=";

export function login(data) {
    console.log("data comes in login services", data);

    return axios.post(fundooUrl + "/user/login", data)
}

export function getAllData() {
    return axios.get(baseURL + localStorage.getItem("token"))
}