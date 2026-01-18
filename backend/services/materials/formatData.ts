import type { MaterialDB } from "../../modules/typesAndConstants";

export const formatMaterialsData = (materials: MaterialDB[]) => {
    materials.forEach(element => {
        element.purchaseDate = element.purchase_date;
        element.serialNumber = element.serial_number;
    });
};