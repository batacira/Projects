export const getProducts = () => {
    return fetch("https://fakestoreapi.com/products/")
        .then((res) => res.json())
}

