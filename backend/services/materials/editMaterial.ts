import { updateMaterial } from "../../modules/materials/updateMaterial"
import { Material } from "../../modules/typesAndConstants"
import { formatMaterialsData } from "./formatData"

export const editMaterial = async (id: number, data: Partial<Material>) => {
    const editedMaterial = await updateMaterial(id, data)
    formatMaterialsData([editedMaterial])
    return editedMaterial
}