import { useContext, useEffect, useState } from "react";
import { MainContext } from "../context/main.context";

const Color = (props) => {
    const { color } = props
    const { colorFilter, setColorFilter, search } = useContext(MainContext)
    const [colorClassName, setColorClassName] = useState("")
    const [active, setActive] = useState(false)
    useEffect(() => {
        if (color.hex_code === colorFilter.hex_code) {
            setActive(true)
        }
        else {
            setActive(false)
        }
    }, [colorFilter])
    return (
        <>
            <div className="color-option"
                onClick={() => {
                    if (active) {
                        setColorFilter({})
                    }
                    else {
                        setColorFilter(color)
                    }
                }}
            >
                <button className={active ? "active" : ""} style={{ backgroundColor: color.hex_code }}></button>
                <p>{color.name}</p>
            </div >
        </>
    )
}

export default Color;