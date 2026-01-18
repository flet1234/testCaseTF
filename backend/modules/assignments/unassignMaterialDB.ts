import { MaterialStatuses } from "../../services/materials/typesAndConsts";
import { db } from "../db";
import { Tables } from "../typesAndConstants";

export const unassignMaterialDB = async (materialId: number) => {
    return await db.transaction(async (trx) => {
        await trx(Tables.ASSIGNMENTS)
            .where({ material_id: materialId, end_date: null })
            .update({ end_date: new Date() });

        await trx(Tables.MATERIALS)
            .where({ id: materialId })
            .update({ status: MaterialStatuses.AVAILABLE });

        return { message: "Material unassigned successfully" };
    });
};