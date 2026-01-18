import { assignMaterialDB } from "../../modules/assignments/assignMaterialDB"
import { getOneAssignmentByMaterialId } from "../../modules/assignments/getOneAssignmentByMaterialId"
import { Assignments } from "../../modules/typesAndConstants"
import { MaterialStatuses } from "../materials/typesAndConsts"

export const assignMaterial = async (data: Assignments) => {
    const { materialId } = data
    const material = await getOneAssignmentByMaterialId(materialId)
    if (material.status === MaterialStatuses.ASSIGNED) {
        throw new Error("Material is already assigned to someone else.");
    }
    const res = await assignMaterialDB(data)
    return res
}
