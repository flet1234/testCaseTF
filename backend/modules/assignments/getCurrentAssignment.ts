import { db } from "../db";
import { Tables } from "../typesAndConstants";

export const getCurrentAssignmentFromDB = async (materialId: number) => {
    const assignment = await db(Tables.ASSIGNMENTS)
        .join(Tables.ENTITIES, 'assignments.entity_id', '=', 'entities.id')
        .join(Tables.MATERIALS, 'assignments.material_id', '=', 'materials.id')
        .where('assignments.material_id', materialId)
        .whereNull('assignments.end_date')
        .select(
            'assignments.id as assignmentId',
            'materials.name as materialName',
            'materials.serial_number as serialNumber',
            'entities.name as assignedTo',
            'entities.type as entityType',
            'assignments.start_date as assignedOn'
        )
        .first();

    return assignment;
};