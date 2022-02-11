export const capitalizeFirstLetter = (word:string) => {
    return (word.replace(/^\w/, (c: string) => c.toUpperCase()))
}