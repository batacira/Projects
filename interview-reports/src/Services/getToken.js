export const getToken = (email, password) => {
    return fetch("http://localhost:3333/login", {
        method: "POST",
        body: JSON.stringify({
            email,
            password
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(data => data.json())
        .then(info => {
            return info.accessToken
        })
}
