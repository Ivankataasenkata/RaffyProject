export interface Reservation {
    _id?: string,
    userId: string,
    date: string,
    tableType: string,
    hour: string,
    people: number
}