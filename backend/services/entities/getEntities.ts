import { getAllItems } from "../../modules/common/getAll"
import { Tables } from "../../modules/typesAndConstants"

export const getAllEntities = async () => {
    const table = Tables.ENTITIES
    const res = await getAllItems(table)
    return res
}