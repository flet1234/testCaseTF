import { Router } from 'express';
import { createNewEntity } from '../../services/entities/createNewEntity';
import { getAllEntities } from '../../services/entities/getEntities';
import { getEntityDetail } from '../../services/entities/getEntityDetail';
import { deleteEntity } from '../../services/entities/deleteEntity';
import { editEntity } from '../../services/entities/editEntity';
import { entityCreateSchema, entityUpdateSchema, idOnlySchema } from './zodSchemas';
import z from 'zod';

const entityRoutes = Router();

entityRoutes.get('/', async (_, res) => {
    try {
        const entities = await getAllEntities()
        res.json(entities);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something goes wrong" })
    }

});

entityRoutes.post('/create', async (req, res) => {
    try {
        const validatedData = entityCreateSchema.parse(req.body)
        const { name, type, email, jobTitle, description, address } = validatedData;
        const newEntity = await createNewEntity({ type, name, email, description, jobTitle, address })
        res.status(201).json(newEntity);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ error: "Something goes wrong" })
    }
});

entityRoutes.get('/:id', async (req, res) => {
    try {
        const validatedData = idOnlySchema.parse(req.params.id)
        const result = await getEntityDetail(validatedData.id)
        res.json(result);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ error: "Something goes wrong" })
    }
});

entityRoutes.delete('/delete', async (req, res) => {
    const validatedData = idOnlySchema.parse(req.body)
    const isDeleted = await deleteEntity(validatedData.id)
    res.json(isDeleted);
});

entityRoutes.put('/update', async (req, res) => {
    const validatedData = entityUpdateSchema.parse(req.body)
    const { id, name, type, email, jobTitle, description, address } = validatedData
    const data = {
        name, type, email, jobTitle, description, address
    }
    try {
        const updatedEntity = await editEntity(id, data)
        res.status(201).json(updatedEntity);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ error: "Something goes wrong" })
    }
});

export default entityRoutes;






