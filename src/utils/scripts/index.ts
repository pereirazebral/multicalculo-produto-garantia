const addDarkModeBody = () => {
    let body: any = null
    body = document.querySelector('body')
    return body.classList.add('dark-mode')
}

const removeDarkModeBody = () => {
    let body: any = null
    body = document.querySelector('body')
    return body.classList.remove('dark-mode')
}

export { 
    addDarkModeBody,
    removeDarkModeBody
}