import { Router } from 'express';
import { assignmentCreateSchema, assignmentMaterialIdSchema } from './zodSchemas';
import z from 'zod';
import { getAssignmentHistory } from '../../services/assignments/getAssignmentHistory';
import { assignMaterial } from '../../services/assignments/assignMaterial';
import { unassignMaterial } from '../../services/assignments/unassignMaterial';
import { getCurrentAssignment } from '../../services/assignments/getCurrentAssignment';

const assignmentRoutes = Router();

assignmentRoutes.post('/history', async (req, res) => {
    try {
        const validatedData = assignmentMaterialIdSchema.parse(req.body)
        const history = await getAssignmentHistory(validatedData.materialId)
        res.json(history);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ error: "Something goes wrong" })
    }
});

assignmentRoutes.post('/assign', async (req, res) => {
    try {
        const validatedData = assignmentCreateSchema.parse(req.body)
        const response = await assignMaterial(validatedData)
        res.json(response);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ error: "Something goes wrong" })
    }
})

assignmentRoutes.post('/unassign', async (req, res) => {
    try {
        const validatedData = assignmentMaterialIdSchema.parse(req.body)
        const response = await unassignMaterial(validatedData.materialId)
        res.json(response);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ error: "Something goes wrong" })
    }
})

assignmentRoutes.post('/current', async (req, res) => {
    try {
        const validatedData = assignmentMaterialIdSchema.parse(req.body)
        const response = await getCurrentAssignment(validatedData.materialId)
        res.json(response);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ error: "Something goes wrong" })
    }
})

export default assignmentRoutes