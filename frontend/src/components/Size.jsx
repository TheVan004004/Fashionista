import { useContext, useEffect, useState } from "react";
import { MainContext } from "../context/main.context";

const Size = (props) => {
    const { sizeName } = props
    const { size, setSize } = useContext(MainContext)
    const [active, setActive] = useState(false)
    useEffect(() => {
        if (size === sizeName) {
            setActive(true)
        }
        else {
            setActive(false)
        }
    }, [size])
    return (

        <button className={active ? "active size" : "size"}
            onClick={() => {
                if (active) { setSize("") }
                else { setSize(sizeName) }
            }}>
            {sizeName}
        </button >
    )
}

export default Size;