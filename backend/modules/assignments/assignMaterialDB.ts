import { MaterialStatuses } from "../../services/materials/typesAndConsts";
import { db } from "../db";
import { Assignments, Tables } from "../typesAndConstants";

export const assignMaterialDB = async (data: Assignments) => {
    return await db.transaction(async (trx) => {
        await trx(Tables.MATERIALS)
            .where({ id: data.materialId })
            .update({ status: MaterialStatuses.ASSIGNED });
        const [assignment] = await trx(Tables.ASSIGNMENTS)
            .insert({
                material_id: data.materialId,
                entity_id: data.entityId,
                start_date: data.startDate,
            })
            .returning('*');
        return assignment;
    });
};