import { getCurrentAssignmentFromDB } from "../../modules/assignments/getCurrentAssignment"

export const getCurrentAssignment = async (materialId: number) => {
    const res = await getCurrentAssignmentFromDB(materialId)
    return res
}