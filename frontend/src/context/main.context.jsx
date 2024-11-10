import { createContext, useEffect, useState } from "react";
import { searchAPI, getAllProductsAPI, getMostPopularAPI, getMostSaleAPI } from "../services/services";

export const MainContext = createContext({})

export const ContextWrapper = (props) => {
    const [colorFilter, setColorFilter] = useState("")
    const [size, setSize] = useState("")
    const [minPrice, setMinPrice] = useState("")
    const [maxPrice, setMaxPrice] = useState("")
    const [listResult, setListResult] = useState([])
    const [inputSearch, setInputSearch] = useState("")
    const [productDetail, setProductDetail] = useState({})
    const [sort, setSort] = useState("most_buyturn")
    const [listPopular, setListPopular] = useState([])
    const [listBestSaler, setListBestSaler] = useState([])
    const [user, setUser] = useState(null)
    console.log(user)
    useEffect(() => {
        getProductPopular()
        getBestSaler()
    }, []);
    useEffect(() => {
        console.log(inputSearch, colorFilter, size, minPrice, maxPrice)
        search()
    }, [colorFilter, minPrice, maxPrice, sort])
    const getProductPopular = async () => {
        const res = await getMostPopularAPI()
        const data = await res.data
        setListPopular(data)
    }
    const getBestSaler = async () => {
        const res = await getMostSaleAPI()
        const data = await res.data
        setListBestSaler(data)
    }
    const search = async () => {
        if (inputSearch === "") {
            return;
        }
        try {
            window.scrollTo({ top: 0 })
            const res = await searchAPI(inputSearch, colorFilter.hex_code, size, minPrice, maxPrice, sort);
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
                sort, setSort,
                colorFilter, setColorFilter,
                size, setSize,
                minPrice, setMinPrice,
                maxPrice, setMaxPrice,
                listResult, setListResult,
                search, inputSearch, setInputSearch,
                productDetail, setProductDetail,
                listPopular, listBestSaler,
                user, setUser
            }}
        >
            {props.children}
        </MainContext.Provider >
    )
}