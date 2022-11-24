import { useState, useEffect } from "react"

const initialBorderWidthAfterLoading = 0

const useBorder = () => {
    const [borderWidth, setBorderWidth] = useState(initialBorderWidthAfterLoading)

    useEffect(() => {
		document.documentElement.style.setProperty("--border-width", `${borderWidth}px`)
	}, [borderWidth])

    const toggleBorders = (event) => {
        setBorderWidth(prevColorIndex => 1 - prevColorIndex)
        document.documentElement.style.setProperty("--border-width", borderWidth)
        console.log(`Done. Border width: ${borderWidth}`)
    }

    useEffect(() => {
        document.documentElement.style.setProperty("--border-width", `${borderWidth}px`)
    }, [borderWidth])

    return toggleBorders
}

export default useBorder