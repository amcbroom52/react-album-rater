import { useEffect, useState } from "react";


/** Hook to handle data in local storage.
 *
 * Recieves or sets the local storage data of the given key.
 */

function useLocalStorage(key) {
    console.log('in useLocalStorage hook');
    const [data, setData] = useState(localStorage.getItem(key));
    console.log("LOCAL TOKEN", data);

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