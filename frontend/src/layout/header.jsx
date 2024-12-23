import { useNavigate } from "react-router-dom";
import "../styles/layout/header.css";
import { useContext, useState } from "react";
import { MainContext } from "../context/main.context";
import UserBox from "../user/user.box";
import {
  HiOutlineHome,
  HiOutlineMenu,
  HiOutlineShoppingBag,
  HiOutlineUserCircle,
  HiSearch,
} from "react-icons/hi";
import DropdownMenu from "../components/DropdownMenu";
const Header = () => {
  const navigate = useNavigate();
  const [isSearch, setIsSearch] = useState(false);
  const [boxUser, setBoxUser] = useState("isLogin");
  const [isOpenModalUser, setIsOpenModalUser] = useState(false);
  const { inputSearch, setInputSearch, search, user, setIsSearching } =
    useContext(MainContext);
  return (
    <>
      <div id="header">
        <div className="logo">LOGO is here</div>
        <div id="menu-left">
          <div
            className="icon"
            onClick={() => {
              navigate("/search");
              setIsSearch(true);
            }}
            name="search-icon"
          >
            <div className={isSearch ? "show box-search" : "hidden box-search"}>
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm"
                value={inputSearch}
                onChange={(e) => {
                  setInputSearch(e.target.value);
                }}
              />
            </div>
            <div
              onClick={() => {
                if (isSearch) {
                  search();
                }
              }}
            >
              <HiSearch
                style={{
                  color: isSearch
                    ? "var(--text-color)"
                    : "var(--background-color)",
                }}
              />
            </div>
          </div>
          <div
            className="icon"
            onClick={() => {
              navigate("/");
              setIsSearch(false);
            }}
            name="home-icon"
          >
            <HiOutlineHome />
          </div>
          {user ? (
            <>
              {user.role === "user" && (
                <div
                  className="icon"
                  onClick={() => {
                    navigate("/cart");
                  }}
                  name="bag-icon"
                >
                  <HiOutlineShoppingBag />
                </div>
              )}

              <label
                htmlFor="menu-user-check"
                className="icon"
                name="user-icon"
              >
                <HiOutlineMenu />
                <DropdownMenu></DropdownMenu>
              </label>
            </>
          ) : (
            <div className="icon" name="user-icon">
              <HiOutlineUserCircle
                onClick={() => {
                  setIsOpenModalUser(true);
                  setBoxUser("isLogin");
                }}
              />
            </div>
          )}
        </div>
      </div>
      <UserBox
        boxUser={boxUser}
        setBoxUser={setBoxUser}
        isOpenModalUser={isOpenModalUser}
        setIsOpenModalUser={setIsOpenModalUser}
      />
    </>
  );
};

export default Header;
