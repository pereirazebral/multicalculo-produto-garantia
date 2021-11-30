
const showNotification = (ref: any,
    severity: string = 'success', 
    summary: string = 'Success Message', 
    detail: string = 'Message Content',
    life: number = 8000 ) => {
    return(
        ref.current.show({
            severity: severity, 
            summary: summary, 
            detail: detail, 
            life: life
        })
    )
}



const clearNotification = (ref: any ) => {
    return ref.current.clear();
}
export {showNotification, clearNotification }