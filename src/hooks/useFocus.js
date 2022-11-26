import { useState, useRef, useEffect } from "react"


function useFocus() {
    const [hasFocus, setFocus] = useState(false)	    // tracks if the input field is focused
    const toggleFocus = () => { setFocus(!hasFocus) }	// toggles hasFocus

    const elementRef = useRef(null)

    useEffect(() => {	// initialize hasFocus properly
        if (document.hasFocus() && elementRef.current.contains(document.activeElement)) {
            setFocus(true);
        }
    }, [])

    return [elementRef, hasFocus, toggleFocus]
}

export default useFocus