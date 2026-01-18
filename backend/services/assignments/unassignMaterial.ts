import { unassignMaterialDB } from "../../modules/assignments/unassignMaterialDB"

export const unassignMaterial = async (materialId: number) => {
    const res = await unassignMaterialDB(materialId)
    return res
}