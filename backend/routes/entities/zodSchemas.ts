import * as z from "zod";

export const entityCreateSchema = z.object({
    type: z.enum(['Person', 'Location']),
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email format").optional().or(z.literal('')),
    description: z.string().optional(),
    jobTitle: z.string().optional(),
    address: z.string().optional(),
});

export const idOnlySchema = z.object({
    id: z.coerce.number().int().positive()
})

export const entityUpdateSchema = entityCreateSchema.partial().extend({
    id: z.coerce.number().int().positive()
});

