import { useContext, useEffect, useState } from "react";
import { MainContext } from "../context/main.context";

const Color = (props) => {
    const { colorName, type } = props
    const { color, setColor, search } = useContext(MainContext)
    const [colorClassName, setColorClassName] = useState("")
    const [active, setActive] = useState(false)
    useEffect(() => {
        switch (colorName) {
            case "Đỏ":
                setColorClassName("red")
                break;
            case "Đen":
                setColorClassName("black")
                break;
            case "Trắng":
                setColorClassName("white")
                break;
            case "Ghi":
                setColorClassName("gray")
                break;
            case "Be":
                setColorClassName("beige")
                break;
            case "Nâu":
                setColorClassName("brown")
                break;
            case "Xanh rêu":
                setColorClassName("dark-green")
                break;
            default:
                break;
        }
        if (color === colorName) {
            setActive(true)
        }
        else {
            setActive(false)
        }
    }, [color])
    return (
        <>
            <div className="color-option"
                onClick={() => {
                    if (active) { setColor("") }
                    else { setColor(colorName) }
                    search()
                }}
            >
                <button className={active ? `active ${colorClassName}` : colorClassName}></button>
                <p>{colorName}</p>
            </div >
        </>
    )
}

export default Color;