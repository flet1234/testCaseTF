import { Tables } from "../typesAndConstants"
import { db } from "../db"

export const getOneItem = async (table: Tables, id: number) => {
    return await db(table).select('*').where({ id }).first()
}