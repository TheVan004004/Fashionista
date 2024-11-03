import { useNavigate } from 'react-router-dom'
import '../styles/header.css'
import { useContext, useState } from 'react';
import { searchAPI } from '../services/services';
import { MainContext } from '../context/main.context';
const Header = () => {
    const navigate = useNavigate();
    const [isSearch, setIsSearch] = useState(false)
    const { inputSearch, setInputSearch, search } = useContext(MainContext)
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
                        ><svg viewBox="0 0 28 28"
                            xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M12.2852 4.05704C7.74092 4.05704 4.05704 7.74092 4.05704 12.2852C4.05704 16.8295 7.74092 20.5134 12.2852 20.5134C16.8295 20.5134 20.5134 16.8295 20.5134 12.2852C20.5134 7.74092 16.8295 4.05704 12.2852 4.05704ZM2 12.2852C2 6.60485 6.60485 2 12.2852 2C17.9656 2 22.5704 6.60485 22.5704 12.2852C22.5704 17.9656 17.9656 22.5704 12.2852 22.5704C6.60485 22.5704 2 17.9656 2 12.2852Z" fillRule="evenodd" /><path d="M19.8786 18.3487L25.6829 24.153C26.1057 24.5758 26.1057 25.2613 25.6829 25.6841C25.2601 26.1069 24.5746 26.1069 24.1518 25.6841L18.3475 19.8798L19.8786 18.3487Z" /></svg></div>

                    </div>
                    <div className="icon"
                        onClick={() => {
                            navigate('/')
                            setIsSearch(false)
                        }}
                        name="home-icon"
                    >
                        <svg viewBox="0 0 28 28"
                            xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M16.3382 1.94393L25.9705 9.82424L26.0201 9.8788C26.1701 10.0437 26.3998 10.3064 26.5943 10.6198C26.7798 10.9189 27 11.3686 27 11.8956V24.9976C27 26.1013 26.1068 27 25 27H18.7601C17.9317 27 17.2601 26.3284 17.2601 25.5V20.7939C17.2601 18.9948 15.8058 17.5405 14.0168 17.5405C12.2279 17.5405 10.7735 18.9948 10.7735 20.7939V25.5C10.7735 26.3284 10.102 27 9.27354 27H3C1.89318 27 1 26.1013 1 24.9976V11.7425C1 11.0901 1.36299 10.564 1.56986 10.3028C1.69049 10.1505 1.80873 10.0264 1.89631 9.94036C1.9407 9.89677 1.97877 9.86147 2.0074 9.83565C2.02175 9.8227 2.03384 9.81204 2.0433 9.80382L2.05551 9.79329L2.06007 9.7894L2.06278 9.7871C2.06278 9.7871 2.06356 9.78646 2.7075 10.5515L2.06356 9.78646L2.07352 9.77807L11.6288 1.94617C12.9452 0.685478 15.0206 0.684487 16.3382 1.94393ZM3.35246 11.3159L3.3468 11.3209C3.33673 11.33 3.31953 11.3459 3.29759 11.3674C3.25251 11.4117 3.19388 11.4736 3.13764 11.5446C3.07966 11.6178 3.038 11.6834 3.01374 11.7344C3.00661 11.7494 3.00238 11.7602 3 11.767V24.9976L3.00006 24.9992L3.0007 25H8.77354V20.7939C8.77354 17.8948 11.1188 15.5405 14.0168 15.5405C16.9149 15.5405 19.2601 17.8948 19.2601 20.7939V25H24.9993L24.9999 24.9992L25 24.9976V11.8956C25 11.8989 25.0008 11.8992 25 11.8956C24.9966 11.8812 24.9788 11.8095 24.8948 11.6742C24.8108 11.5389 24.7005 11.4037 24.588 11.2772L15.004 3.43645L14.9714 3.40439C14.4228 2.86484 13.5451 2.86525 12.997 3.40534L12.9644 3.43744L3.35246 11.3159Z" fillRule="evenodd" /></svg>
                    </div>
                    <div className="icon"
                        onClick={() => { console.log("click") }}
                        name="bag-icon"
                    >
                        <svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg"><path d="M9.91485 21.5689C9.96933 21.896 10.2785 22.117 10.6053 22.0625L11.3944 21.9309C11.7213 21.8763 11.9421 21.567 11.8876 21.2399L11.1398 16.7496C11.0853 16.4225 10.7762 16.2016 10.4493 16.2561L9.6602 16.3877C9.33334 16.4422 9.11252 16.7516 9.167 17.0787L9.91485 21.5689Z" fill="#000000" /><path d="M16.1121 21.2399C16.0577 21.567 16.2785 21.8763 16.6053 21.9309L17.3944 22.0625C17.7213 22.117 18.0304 21.896 18.0849 21.5689L18.8328 17.078C18.8873 16.7509 18.6665 16.4415 18.3396 16.387L17.5505 16.2554C17.2237 16.2009 16.9145 16.4219 16.8601 16.749L16.1121 21.2399Z" /><path clipRule="evenodd" d="M21.2371 8.98725H6.52918L12.1736 3.69163C12.4557 3.42702 12.4699 2.9837 12.2055 2.70145L11.7952 2.2634C11.5308 1.98115 11.0878 1.96685 10.8057 2.23146L3.82708 8.77885C3.76176 8.84014 3.71079 8.91101 3.67433 8.98725H2C1.44772 8.98725 1 9.43531 1 9.988V13.991C1 14.5437 1.44772 14.9918 2 14.9918H2.42519L4.56603 25.0493C4.68403 25.6037 5.1733 26 5.73969 26H22.2586C22.825 26 23.3143 25.6037 23.4323 25.0493L25.5731 14.9918H26C26.5523 14.9918 27 14.5437 27 13.991V9.988C27 9.43531 26.5523 8.98725 26 8.98725H24.2757C24.2341 8.90663 24.176 8.83282 24.102 8.77108L16.1775 2.16238C15.8805 1.9147 15.4391 1.95486 15.1916 2.25208L14.8075 2.71336C14.56 3.01057 14.6001 3.4523 14.8971 3.69998L21.2371 8.98725ZM3.6 10.9888C3.26863 10.9888 3 11.2576 3 11.5892V12.3898C3 12.7214 3.26863 12.9903 3.6 12.9903H24.4C24.7314 12.9903 25 12.7214 25 12.3898V11.5892C25 11.2576 24.7314 10.9888 24.4 10.9888H3.6ZM4.65025 15.8382C4.55747 15.4024 4.88958 14.9918 5.33489 14.9918H22.6634C23.1087 14.9918 23.4408 15.4024 23.3481 15.8382L21.7291 23.4439C21.6603 23.7673 21.3749 23.9985 21.0445 23.9985H6.95382C6.62342 23.9985 6.33802 23.7673 6.26918 23.4439L4.65025 15.8382Z" fillRule="evenodd" /></svg>
                    </div>
                    <div className="icon"
                        onClick={() => { console.log("click") }}
                        name="user-icon"
                    >
                        <svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M13.9991 2C10.6405 2 7.88924 4.6739 7.88924 8.00723C7.88924 10.1497 9.02582 12.0197 10.7297 13.0825C5.95609 14.5248 2.41965 19.0144 2.00617 24.0771C1.91662 25.1735 2.81571 26 3.81688 26H24.1831C25.1843 26 26.0834 25.1735 25.9938 24.0771C25.5803 19.014 22.0433 14.524 17.2691 13.0821C18.9726 12.0193 20.109 10.1494 20.109 8.00723C20.109 4.6739 17.3577 2 13.9991 2ZM9.74071 8.00723C9.74071 5.72598 11.6315 3.84838 13.9991 3.84838C16.3667 3.84838 18.2575 5.72598 18.2575 8.00723C18.2575 10.2885 16.3667 12.1661 13.9991 12.1661C11.6315 12.1661 9.74071 10.2885 9.74071 8.00723ZM4.95086 24.1516C4.36361 24.1516 3.89887 23.6462 4.01091 23.0697C4.94115 18.2837 9.09806 14.4476 14 14.4476C18.902 14.4476 23.0589 18.2837 23.9891 23.0697C24.1011 23.6462 23.6364 24.1516 23.0492 24.1516H4.95086Z" fillRule="evenodd" /></svg>
                    </div>
                    <div className="icon"
                        onClick={() => { console.log("click") }}
                        name="menu-icon"
                    >
                        <svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg"><path d="M8 7.29805C8 6.85622 8.35817 6.49805 8.8 6.49805H25.2C25.6418 6.49805 26 6.85622 26 7.29805V7.69805C26 8.13987 25.6418 8.49805 25.2 8.49805H8.8C8.35817 8.49805 8 8.13987 8 7.69805V7.29805Z" /><path d="M8 21.298C8 20.8562 8.35817 20.498 8.8 20.498H25.2C25.6418 20.498 26 20.8562 26 21.298V21.698C26 22.1399 25.6418 22.498 25.2 22.498H8.8C8.35817 22.498 8 22.1399 8 21.698V21.298Z" fill="#000000" /><path d="M8 14.298C8 13.8562 8.35817 13.498 8.8 13.498H25.2C25.6418 13.498 26 13.8562 26 14.298V14.698C26 15.1399 25.6418 15.498 25.2 15.498H8.8C8.35817 15.498 8 15.1399 8 14.698V14.298Z" fill="#000000" /><path d="M5 7.5C5 8.32843 4.32843 9 3.5 9C2.67157 9 2 8.32843 2 7.5C2 6.67157 2.67157 6 3.5 6C4.32843 6 5 6.67157 5 7.5Z" fill="#000000" /><path d="M5 21.498C5 22.3265 4.32843 22.998 3.5 22.998C2.67157 22.998 2 22.3265 2 21.498C2 20.6696 2.67157 19.998 3.5 19.998C4.32843 19.998 5 20.6696 5 21.498Z" fill="#000000" /><path d="M5 14.498C5 15.3265 4.32843 15.998 3.5 15.998C2.67157 15.998 2 15.3265 2 14.498C2 13.6696 2.67157 12.998 3.5 12.998C4.32843 12.998 5 13.6696 5 14.498Z" /></svg>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;