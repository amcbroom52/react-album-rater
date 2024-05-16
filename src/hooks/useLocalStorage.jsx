import { useEffect, useState } from "react";
function useLocalStorage(key, initialValue) {
    console.log('in useLocalStorage hook');
    const [data, setData] = useState(localStorage.getItem(key));

    useEffect(function getDataFromStorage() {
        if (!data) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, data);
        }
    }, [data]);

    return [data, setData];
}

export default useLocalStorage;