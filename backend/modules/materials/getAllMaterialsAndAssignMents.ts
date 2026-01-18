import { db } from "../db";

export const getAllMaterialsAndAssignments = async () => {
    const materials = await db('materials')
        .leftJoin('assignments', function () {
            this.on('materials.id', '=', 'assignments.material_id')
                .andOnNull('assignments.end_date');
        })
        .leftJoin('entities', 'assignments.entity_id', 'entities.id')
        .select(
            'materials.id',
            'materials.name',
            'materials.category',
            'materials.status',
            'materials.serial_number',
            'materials.purchase_date',
            'materials.notes',
            'entities.name as assignedToName',
            'entities.type as assignedToType'
        )
        .orderBy('materials.id', 'desc');

    return materials;
}