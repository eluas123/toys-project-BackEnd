// FOR REAL SERVER WE CAN CHANGE IT FAST
export const API_URL = "http://localhost:3000";
// export const API_URL = "http://eliasproject.herokapp.net";
export const doApiGet = async(_url) => {
    try {
        let resp = await fetch(_url, {
            method: "GET",
            headers: {
                'auth-token': localStorage["tok_toys"],
                'content-type': "application/json"
            }
        })
        let data = await resp.json();
        return data;
    } catch (err) {
        throw err;
    }
}

// POST,PUT,DELETE ,PATCH REQUEST
export const doApiMethod = async(_url, _method, _body) => {
    try {
        let resp = await fetch(_url, {
            method: _method,
            body: JSON.stringify(_body),
            headers: {
                'auth-token': localStorage["tok_toys"],
                'content-type': "application/json"
            }
        })
        let data = await resp.json();
        return data;
    } catch (err) {
        throw err;
    }
}