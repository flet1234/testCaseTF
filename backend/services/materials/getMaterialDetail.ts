import { getOneItem } from "../../modules/common/getOne"
import { Tables } from "../../modules/typesAndConstants"
import { formatMaterialsData } from "./formatData"

export const getMaterialDetail = async (id: number) => {
    const table = Tables.MATERIALS
    const material = await getOneItem(table, id)
    formatMaterialsData([material])
    return material
}