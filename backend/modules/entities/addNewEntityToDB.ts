import { db } from "../db";
import { Entity, Tables } from "../typesAndConstants";

export const addNewEntityToDB = async (newEntityObject: Omit<Entity, 'id'>) => {
    const { jobTitle, ...rest } = newEntityObject;
    const [result] = await db(Tables.ENTITIES)
        .insert({
            ...rest,
            job_title: jobTitle
        })
        .returning('*');
    return result;
}