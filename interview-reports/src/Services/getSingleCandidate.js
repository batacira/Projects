export const getSingleCandidate = (id, token) => { 
    return fetch(`http://localhost:3333/api/candidates/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((data) => data.json())
        .then((info) => {
            return info
        });
};
