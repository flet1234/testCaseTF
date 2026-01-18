import { db } from "../db";
import { Entity, Tables } from "../typesAndConstants";

export const updateEntity = async (
    id: number,
    data: Partial<Entity>
) => {
    const { jobTitle, ...rest } = data;
    const updateData: any = { ...rest };
    if (jobTitle) updateData.job_title = jobTitle;
    const [updatedRecord] = await db(Tables.ENTITIES)
        .where({ id })
        .update(updateData)
        .returning('*');
    return updatedRecord;
}