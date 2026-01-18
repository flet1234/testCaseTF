// types.ts
export interface Material {
    id: number;
    name: string;
    category: 'Laptop' | 'Screen' | 'Phone' | 'Furniture' | 'Other';
    serialNumber: string;
    purchaseDate: Date;
    status: 'Available' | 'Assigned' | 'Under maintenance';
    notes?: string;
}

export interface MaterialDB extends Material {
    serial_number: string;
    purchase_date: Date;
}

export interface Entity {
    id: number;
    type: 'Person' | 'Location';
    name: string;
    email?: string;
    description?: string
    jobTitle?: string;
    address?: string;
}

export enum Tables {
    MATERIALS = 'materials',
    ENTITIES = 'entities',
    ASSIGNMENTS = 'assignments',
}

export interface Assignments {
    materialId: number,
    entityId: number,
    startDate: Date,
    endDate?: Date | null

}