import { deleteOneItem } from "../../modules/common/deleteOne"
import { Tables } from "../../modules/typesAndConstants"

export const deleteMaterial = async (id: number) => {
    const table = Tables.MATERIALS

    const res = await deleteOneItem(table, id)
    return res
}