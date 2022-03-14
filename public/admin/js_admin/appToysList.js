import { API_URL, doApiGet, doApiMethod } from "../services/apiService.js";
import { authUser } from "../services/authService.js";
import ToysTrClass from "./toysTrClass.js";
let $ = document.querySelector.bind(document);

window.onload = () => {
    authUser();
    doApi();
    declareViewEvents();
}
const declareViewEvents = () => {
    $("#id_logout").addEventListener("click", () => {
        ///confrim =>> confriming
        if (confirm("Are you sure you want to log out?")) {
            localStorage.removeItem("tok_toys");
            window.location.href = "login.html";
        }
    })
}

const doApi = async() => {
    // REQUEST GET SENDING TOKEN
    let url = API_URL + "/toyss/usertoyss?perPage=50";

    let data = await doApiGet(url);
    console.log(data);
    createToyssTr(data);
}

const createToyssTr = (_ar) => {
    $("#id_tbody").innerHTML = "";
    _ar.forEach((item, i) => {
        let toysTr = new ToysTrClass("#id_tbody", item, i, deletetoys);
        toysTr.render();
    })
}


const deletetoys = async(_id) => {
    let url = API_URL + "/toyss/" + _id;
    try {
        let data = await doApiMethod(url, "DELETE", {});
        console.log(data);
        if (data.deletedCount == 1) {
            doApi();
        }
    } catch (err) {
        console.log(err);
        alert("There problem , try again later");
    }
}