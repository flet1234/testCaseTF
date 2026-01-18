import * as z from "zod";

// Shared Enums to keep code DRY (Don't Repeat Yourself)
const CategoryEnum = z.enum(['Laptop', 'Screen', 'Phone', 'Furniture', 'Other']);
const StatusEnum = z.enum(['Available', 'Assigned', 'Under maintenance']);

export const materialCreateSchema = z.object({
    name: z.string().min(1, "Name is required"),
    category: CategoryEnum,
    serialNumber: z.string().min(1, "Serial number is required"),
    purchaseDate: z.coerce.date(),
    status: StatusEnum.default('Available'),
    notes: z.string().optional()
});

export const materialUpdateSchema = materialCreateSchema.partial().extend({
    id: z.coerce.number()
});
