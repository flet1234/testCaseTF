import { getAllItems } from "../../modules/common/getAll"
import { getAllMaterialsAndAssignments } from "../../modules/materials/getAllMaterialsAndAssignMents"
import { Tables } from "../../modules/typesAndConstants"
import { formatMaterialsData } from "./formatData"

export const getAllMaterials = async () => {
    const table = Tables.MATERIALS
    const allMaterials = await getAllMaterialsAndAssignments()
    // const allMaterials = await getAllItems(table)
    formatMaterialsData(allMaterials)
    return allMaterials
}