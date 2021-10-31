const endPoint = "https://jsonplaceholder.typicode.com/posts";
const authorEndPoint = "https://jsonplaceholder.typicode.com/users";

export const getData = () => {
  return fetch(endPoint)
    .then((response) => {
      //console.log(response)
      return response.json();
    })
    .then((myResponse) => {
      //console.log(myResponse)
      return myResponse;
    });
};

export const getSingleBlog = (id) => {
  return fetch(`${endPoint}/${id}`)
    .then((response) => {
      return response.json();
    })
    .then((myResponse) => {
      return {
        title: myResponse.title,
        body: myResponse.body,
        id: myResponse.id,
        userId: myResponse.userId,
      };
    });
};

export const getAuthor = (authorId) => {
  return fetch(`${authorEndPoint}/${authorId}`)
    .then((response) => response.json())
    .then((json) => {
      return {
        address: json.address,
        company: json.company,
        email: json.email,
        id: json.id,
        name: json.name,
        phone: json.phone,
        username: json.username,
        website: json.website,
      };
    });
};

export const authorPosts = (authorId) => {
  return fetch(`${endPoint}?userId=${authorId}`)
    .then((response) => response.json())
    .then((result) => {
        return result
    });
};

export const getAuthors = () => {
  return fetch(authorEndPoint)
    .then(response => response.json())
    .then(authors => {
      return authors
    });
}