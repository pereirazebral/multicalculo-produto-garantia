const setLocalStorageItem = (key: string, value: any) =>{
    return localStorage.setItem(key, value);
}

const getLocalStorageItem = (key: string) =>{
    
    let value = localStorage.getItem(key);
    
    if(value === "true")return true
    if(value === "false")return false

    return value
}

const removeLocalStorageItem = (key: string) =>{
    return localStorage.removeItem(key);
}

export { setLocalStorageItem, getLocalStorageItem, removeLocalStorageItem}