export const createTime = ():string => {
    const newOne:Date = new Date(Date.UTC(new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        new Date().getHours(), new Date().getMinutes(), new Date().getSeconds()))
    const minus:number = newOne.getTime() 
    const dateToIso:String[] = new Date(minus).toISOString().split('T')
    return `${dateToIso[0]} ${dateToIso[1].split('.')[0]}`
}