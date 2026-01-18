import { addNewMaterialToDB } from "../../modules/materials/addNewMaterialToDB"
import { Material } from "../../modules/typesAndConstants"
import { formatMaterialsData } from "./formatData"

export const createNewMaterial = async ({ name, category, serialNumber, purchaseDate, status, notes }: Omit<Material, "id">) => {
    const newMaterial = { name, category, serialNumber, purchaseDate, status, notes }
    const addedMaterial = await addNewMaterialToDB(newMaterial)
    formatMaterialsData([addedMaterial])
    return addedMaterial
}