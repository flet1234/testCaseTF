import { db } from "../db";
import { Material, Tables } from "../typesAndConstants";

export const addNewMaterialToDB = async (newEntityObject: Omit<Material, 'id'>) => {
    const { purchaseDate, serialNumber, ...rest } = newEntityObject;
    const [result] = await db(Tables.MATERIALS)
        .insert({
            ...rest,
            purchase_date: purchaseDate,
            serial_number: serialNumber
        })
        .returning('*');
    return result;
}