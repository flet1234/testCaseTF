import { Router } from 'express';
import { getAllMaterials } from '../../services/materials/getAllMaterial';
import { createNewMaterial } from '../../services/materials/createNewMaterial';
import { getMaterialDetail } from '../../services/materials/getMaterialDetail';
import { deleteMaterial } from '../../services/materials/deleteMaterial';
import { editMaterial } from '../../services/materials/editMaterial';
import { materialCreateSchema, materialUpdateSchema } from './zodSchemas';
import z from 'zod';
import { idOnlySchema } from '../entities/zodSchemas';

const materialRoutes = Router();

materialRoutes.get('/', async (_, res) => {
    try {
        const materials = await getAllMaterials()
        res.json(materials);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something goes wrong" })
    }

});

materialRoutes.post('/create', async (req, res) => {
    try {
        const validatedData = materialCreateSchema.parse(req.body)
        const { name, category, serialNumber, purchaseDate, status, notes } = validatedData;
        const newMaterial = await createNewMaterial({ name, category, serialNumber, purchaseDate, status, notes })
        res.status(201).json(newMaterial);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ error: "Something goes wrong" })
    }
});

materialRoutes.get('/:id', async (req, res) => {
    try {
        const validatedData = idOnlySchema.parse(req.params)
        const result = await getMaterialDetail(validatedData.id)
        res.json(result);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ error: "Something goes wrong" })
    }

});

materialRoutes.delete('/delete', async (req, res) => {
    try {
        const validatedData = idOnlySchema.parse(req.body)
        const isDeleted = await deleteMaterial(validatedData.id)
        res.json(isDeleted);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ error: "Something goes wrong" })
    }

});

materialRoutes.put('/update', async (req, res) => {
    try {
        const validatedData = materialUpdateSchema.parse(req.body)
        const { id, name, category, serialNumber, purchaseDate, status, notes } = validatedData;
        const data = {
            name, category, serialNumber, purchaseDate, notes, status
        }
        const updatedMaterial = await editMaterial(id, data)
        res.status(201).json(updatedMaterial);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ error: "Something goes wrong" })
    }
});

export default materialRoutes;
