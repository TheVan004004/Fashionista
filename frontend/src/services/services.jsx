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

export { searchAPI }