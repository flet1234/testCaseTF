import { addNewEntityToDB } from "../../modules/entities/addNewEntityToDB"
import { Entity } from "../../modules/typesAndConstants"
import { EntitiesTypes } from "./typesAndConsts"

export const createNewEntity = async ({ type, name, description, email, jobTitle, address }: Omit<Entity, "id">) => {
    if (type === EntitiesTypes.PERSON && address) {
        return { message: "Bad inputs" }
    }
    if (type === EntitiesTypes.LOCATION && (email || jobTitle)) {
        return { message: "Bad inputs" }
    }
    const newEntity = { name, type, email, description, jobTitle, address }
    const res = await addNewEntityToDB(newEntity)
    return res
}