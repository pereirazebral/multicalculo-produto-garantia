const getDateToday = () =>{
    return new Date();
}

const setNewEndDateValidity = (dateToday: Date, termValidity: number) =>{
    
    let year = dateToday.getFullYear(); //ano
    let month = dateToday.getMonth(); // mes
    let day = dateToday.getDate(); // dia

    return new Date(year+termValidity, month, day-1);
}

const setNewInitDateValidity = (dateEnd: Date, termValidity: number) =>{
    
    let year = dateEnd.getFullYear(); //ano
    let month = dateEnd.getMonth(); // mes
    let day = dateEnd.getDate(); // dia

    return new Date(year-termValidity, month, day+1);
}

const getDateFormatText = (value: Date) => {
    let year = value.getFullYear(); //ano
    let month = value.getMonth()+1; // mes
    let day = value.getDate(); // dia
    
    let dayFormat = (day < 10)? "0"+day : day
    let monthFormat = (month<10)? "0"+month :month

    return dayFormat+"/"+monthFormat+"/"+year
} 

export { getDateToday, setNewEndDateValidity, setNewInitDateValidity, getDateFormatText }