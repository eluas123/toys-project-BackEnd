import { API_URL, doApiGet } from "./apiService.js"
export const authUser = async() => {
    let url = API_URL + "/users/authUser";
    try {
        let data = await doApiGet(url)
        if (data.status != "ok") {
            alert("You must logged in first to be here!")
            window.location.href = "login.html";
        }
    } catch (err) {
        throw err;
    }
}