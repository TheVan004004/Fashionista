const DropdownMenu = ({ isOpenMenu }) => {
    return (
        <div style={{
            position: "absolute",
            top: "35px",
            right: "0px",
            width: isOpenMenu ? "100px" : "0px",
            height: isOpenMenu ? "100px" : "0px",
            backgroundColor: "var(--background-color)",
            color: "black",
            borderRadius: "10px",
            overflow: "hidden",
            transition: "height 300ms, width 300ms",
            display: "flex",
            flexDirection: "column",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}>

            <div>Log Out </div>

        </div>
    )
}

export default DropdownMenu