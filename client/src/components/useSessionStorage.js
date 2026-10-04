import { useState, useEffect, useCallback } from "react";

function useSessionStorage(key, initValue) {
    const [val, setVal] = useState(() => {
        const stored = sessionStorage.getItem(key);
        return stored ? JSON.parse(stored) : initValue
    });

    const setStoredVal = useCallback((newValue) => {
        setVal((prev) => {
            const resd = typeof newValue === "function" ? newValue(prev) : newValue;
            sessionStorage.setItem(key, JSON.stringify(resd));
            window.dispatchEvent(new CustomEvent("session-storage"), {detail: {key}})
            return resd;
        })
    }, [key])

    useEffect(() => {
        function onChange(e) {
            if (e.detail && e.detail.key !== key) return;
            const stored = sessionStorage.getItem(key);
            setVal(stored ? JSON.parse(stored) : defaultValue);

            window.addEventListener("session-storage", onChange)

            return () => {
                window.removeEventListener("session-storage", onChange)
            };
        }
    }, [key, initValue])
    return (val, setStoredVal)
}

export default useSessionStorage;
