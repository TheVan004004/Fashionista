import { useNavigate } from 'react-router-dom'
import '../styles/header.css'
import { useContext, useState } from 'react';
import { searchAPI } from '../services/services';
import { MainContext } from '../context/main.context';
import UserBox from '../user/user.box';
import { HiOutlineHome, HiOutlineMenu, HiOutlineShoppingBag, HiOutlineUserCircle, HiSearch } from "react-icons/hi";
const Header = () => {
    const navigate = useNavigate();
    const [isSearch, setIsSearch] = useState(false)
    const [boxUser, setBoxUser] = useState("")
    const { inputSearch, setInputSearch, search, user } = useContext(MainContext)
    return (
        <>
            <div id="header">
                <div className="logo">LOGO is here</div>
                <div id="menu-left">
                    <div className="icon"
                        onClick={() => {
                            navigate('/search')
                            setIsSearch(true)
                        }}
                        name="search-icon"
                    >
                        <div className={isSearch ? "show box-search" : "hidden box-search"}>
                            <input type="text" placeholder='Tìm kiếm sản phẩm'
                                value={inputSearch}
                                onChange={(e) => { setInputSearch(e.target.value) }}
                            />
                        </div>
                        <div
                            onClick={() => {
                                if (isSearch) {
                                    search()
                                }
                            }}
                        >
                            <HiSearch style={{ color: isSearch ? "var(--text-color)" : "var(--background-color)" }} />
                        </div>
                    </div>
                    <div className="icon"
                        onClick={() => {
                            navigate('/')
                            setIsSearch(false)
                        }}
                        name="home-icon"
                    >
                        <HiOutlineHome />
                    </div>
                    <div className="icon"
                        onClick={() => { console.log("click") }}
                        name="bag-icon"
                    >
                        <HiOutlineShoppingBag />
                    </div>
                    <div className="icon"

                        name="user-icon"
                    >
                        {user
                            ?
                            <div
                                style={{
                                    width: "18px",
                                    height: "18px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "gray",
                                    padding: "5px",
                                    borderRadius: "1000px",
                                    textAlign: "center"
                                }}
                                onClick={() => {
                                    navigate("/user")
                                    setIsSearch(false)
                                }}
                            >U</div>
                            :
                            <HiOutlineUserCircle onClick={() => setBoxUser("isLogin")} />
                        }
                    </div>
                    <div className="icon"
                        onClick={() => { console.log("click") }}
                        name="menu-icon"
                    >
                        <HiOutlineMenu />
                    </div>
                </div>
            </div>
            <UserBox
                boxUser={boxUser}
                setBoxUser={setBoxUser}
            />
        </>
    )
}

export default Header;