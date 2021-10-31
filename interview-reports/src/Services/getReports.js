export const getReports = (token) => {
    return fetch("http://localhost:3333/api/reports", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
        .then(data => data.json())
        .then(info => info)
}