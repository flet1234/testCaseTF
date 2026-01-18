import { getAssignmentHistoryDB } from "../../modules/assignments/getAssigmentHistoryDB"

export const getAssignmentHistory = async (materialId: number) => {
    const res = await getAssignmentHistoryDB(materialId)
    return res
}