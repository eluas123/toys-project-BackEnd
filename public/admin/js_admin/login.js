import { API_URL, doApiMethod } from "../services/apiService.js"
let $ = document.querySelector.bind(document);


window.onload = () => {
    declareEvents();
}

const declareEvents = () => {
    $("#id_form").addEventListener("submit", (e) => {
        e.preventDefault();
        let bodyData = {
            email: $("#id_email").value,
            password: $("#id_pass").value
        }

        if (!bodyData.email.includes("@") || !bodyData.email.includes(".") || bodyData.email.length < 5) {
            return alert("Enter valid email!");
        }
        if (bodyData.password.length < 3) {
            return alert("Enter valid password");
        }
        console.log(bodyData)
        doApi(bodyData)

    })
}


const doApi = async(_bodyData) => {
    let url = API_URL + "/users/login"
    try {
        let data = await doApiMethod(url, "POST", _bodyData);
        console.log(data)
            // CHECKING IF LOGIN SUCCESS
        if (data.token) {
            localStorage.setItem("tok_toys", data.token);
            window.location.href = "toysList.html"
        } else {
            alert("Password or email is worng")
        }
    } catch (err) {
        alert("There problem in server try again later..")
    }
}