import { db } from "../db";
import { Tables } from "../typesAndConstants";

export const deleteOneItem = async (table: Tables, id: number) => {
    const deletedCount = await db(table)
        .where({ id })
        .delete();
    return deletedCount > 0;
};

