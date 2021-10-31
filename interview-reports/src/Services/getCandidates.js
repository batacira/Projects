export const getCandidates = (token) => {
    return fetch("http://localhost:3333/api/candidates", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((data) => data.json())
        .then((info) => {
            return info.slice(0, 7);
        });
};
