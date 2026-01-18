import { deleteOneItem } from "../../modules/common/deleteOne"
import { Tables } from "../../modules/typesAndConstants"

export const deleteEntity = async (id: number) => {
    const table = Tables.ENTITIES
    const res = await deleteOneItem(table, id)
    return res
}