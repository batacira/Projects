export const getCompanies = (token) => {
    return fetch("http://localhost:3333/api/companies", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
        .then(data => data.json())
        .then(info => info)
}