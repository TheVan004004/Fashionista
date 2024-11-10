import axios from "axios";
const url = 'http://localhost:4000/'
const searchAPI = (name, color, size, minprice, maxprice) => {
    const data = {
        params: {
            name: name,
            color: color,
            size: size
        }

    }
    return axios.get(`${url}api/products/filter`, data)
}
const getAllProductsAPI = () => {
    return axios.get(`${url}api/products`)
}

const signUpAPI = (username, password) => {
    const data = {
        body: {
            username: username,
            password: password
        }
    }
    return axios.post(`${url}api/signup`, data)
}
export { searchAPI, getAllProductsAPI, signUpAPI }