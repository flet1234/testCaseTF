import { db } from "../db";
import { Tables } from "../typesAndConstants";

export const getOneAssignmentByMaterialId = async (materialId: number) => {
    const material = await db(Tables.MATERIALS)
        .where({ id: materialId })
        .first();
    return material

}