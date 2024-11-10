import { createContext, useState } from "react";
import { searchAPI, getAllProductsAPI } from "../services/services";

export const MainContext = createContext({})

export const ContextWrapper = (props) => {
    const [color, setColor] = useState("")
    const [size, setSize] = useState("")
    const [minPrice, setMinPrice] = useState("")
    const [maxPrice, setMaxPrice] = useState("")
    const [listResult, setListResult] = useState([])
    const [inputSearch, setInputSearch] = useState("")
    const [productDetail, setProductDetail] = useState({})
    const search = async () => {
        if (inputSearch === "") return;
        try {
            // const res = await searchAPI(inputSearch, color, size, minPrice, maxPrice);
            const res = await getAllProductsAPI();
            if (res && res.data) {
                const data = res.data
                setListResult(data)
            }
        }
        catch (e) {

        }
    }
    return (
        <MainContext.Provider
            value={{
                color, setColor,
                size, setSize,
                minPrice, setMinPrice,
                maxPrice, setMaxPrice,
                listResult, setListResult,
                search, inputSearch, setInputSearch,
                productDetail, setProductDetail
            }}
        >
            {props.children}
        </MainContext.Provider >
    )
}