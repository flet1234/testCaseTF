import { Tables } from "../typesAndConstants"
import { db } from "../db"

export const getAllItems = async (table: Tables) => {
    return await db(table).select('*')
}