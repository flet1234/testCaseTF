import { db } from "../db";
import { Tables } from "../typesAndConstants";

export const getAssignmentHistoryDB = async (materialId: number) => {
    return await db(Tables.ASSIGNMENTS)
        .join(Tables.ENTITIES, 'assignments.entity_id', '=', 'entities.id')
        .select(
            'assignments.id',
            'entities.name as assignedTo',
            'assignments.start_date as startDate',
            'assignments.end_date as endDate'
        )
        .where('assignments.material_id', materialId)
        .orderBy('assignments.start_date', 'desc');
};