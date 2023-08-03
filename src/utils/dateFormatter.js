export const dateFormatter = (date, separator) => {
    const day = date.day.toString().length < 2 ? `0${date.day}` : date.day
    const month = date.month.toString().length < 2 ? `0${date.month}` : date.month
    const string = `${day}${separator}${month}${separator}${date.year}`

    return string
}