import * as z from "zod";

export const assignmentCreateSchema = z.object({
    materialId: z.coerce.number().int().positive("A valid Material ID is required"),
    entityId: z.coerce.number().int().positive("A valid Entity ID is required"),
    startDate: z.coerce.date().default(() => new Date()),
});

export const assignmentMaterialIdSchema = z.object({
    materialId: z.coerce.number().int().positive()
});

