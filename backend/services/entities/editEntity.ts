import { updateEntity } from "../../modules/entities/updateEntity"
import { Entity } from "../../modules/typesAndConstants"
import { EntitiesTypes } from "./typesAndConsts"

export const editEntity = async (id: number, data: Partial<Entity>) => {
    const { type, address, email, jobTitle } = data
    if (type === EntitiesTypes.PERSON && address) {
        return { message: "Bad inputs" }
    }
    if (type === EntitiesTypes.LOCATION && (email || jobTitle)) {
        return { message: "Bad inputs" }
    }
    const res = await updateEntity(id, data)
    return res
}