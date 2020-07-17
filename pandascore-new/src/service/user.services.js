import axios from 'axios'
export const userService = {
        login,
        getAllData
    }
    /**
     * <login  Login function>
     * this is fundoo back-end url for login only.
     */
const fundooUrl = "http://fundoonotes.incubation.bridgelabz.com/api";
export function login(data) {
    return axios.post(fundooUrl + "/user/login", data)
}

/**
 * <login  Login function>
 * this is pandascore back-end url for  get response of all champ data.
 * @param {data} data this data is comes from dashboard component.
 */

export function getAllData(data) {
    return axios.get(`https://api.pandascore.co/lol/champions?page[number]=${data}&page[size]=10&token=` + localStorage.getItem("token"))
}

/**
 * <login  Login function>
 * this is pandascore back-end url for  get response of all search result.
 * @param {data} data this data is comes from dashboard component.
 */

export function getSearchResult(data) {
    return axios.get(`https://api.pandascore.co/lol/champions?search[name]=${data}&token=` + localStorage.getItem("token"))
}