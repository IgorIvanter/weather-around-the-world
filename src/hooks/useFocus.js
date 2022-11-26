import { useEffect, useState } from "react";

function useFocus(ref) {
    const [isFocused, setFocus] = useState(false)

    useEffect(() => {
        const element = ref.current
        setFocus(element === document.activeElement)
        element.addEventListener('blur', () => setFocus(false))
        element.addEventListener('focus', () => setFocus(true))
        return () => {
            element.removeEventListener('blur', () => setFocus(false))
            element.removeEventListener('focus', () => setFocus(true))
        }
    }, [ref])

    return isFocused
}

export default useFocus