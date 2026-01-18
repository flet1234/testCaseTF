import { db } from "../db";
import { Material, Tables } from "../typesAndConstants";

export const updateMaterial = async (
    id: number,
    data: Partial<Material>
) => {
    const { purchaseDate, serialNumber, ...rest } = data;
    const updateData: any = { ...rest };
    if (purchaseDate) updateData.purchase_date = purchaseDate;
    if (serialNumber) updateData.serial_number = serialNumber;
    const [updatedRecord] = await db(Tables.MATERIALS)
        .where({ id })
        .update(updateData)
        .returning('*');
    return updatedRecord;
}