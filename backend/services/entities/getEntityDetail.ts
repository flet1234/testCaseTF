import { getOneItem } from "../../modules/common/getOne"
import { Tables } from "../../modules/typesAndConstants"

export const getEntityDetail = async (id: number) => {
    const table = Tables.ENTITIES
    const res = await getOneItem(table, id)
    return res
}