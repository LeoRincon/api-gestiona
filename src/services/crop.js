import { pgpConnection } from "../db.js";

//GET ALL
export async function getServiceCrops() {
    try {
        const crops = await pgpConnection.manyOrNone('SELECT * FROM gestiona.cultivo')
        return crops
    } catch (error) {
        console.log('GET Database Error: '+error)
        return error
    }
}

//GET ONE ID
export async function getServiceCrop(id) {
    try {
        const crop = await pgpConnection.oneOrNone(`SELECT * FROM gestiona.cultivo WHERE id='${id}'`)
        return crop
    } catch (error) {
        console.log('GET Database Error: '+error)
        return error
    }
}

//POST
export async function postServiceCrop(body) {
    try {
        const crop = await pgpConnection.one(`INSERT INTO gestiona.cultivo (nombre_cultivo,tipo_siembra,fecha_inicio,area_terreno,proyecto_id,id_unidad_medida) VALUES ('${body.nombre_cultivo}','${body.tipo_siembra}','${body.fecha_inicio}',${body.area_terreno},'${body.proyecto_id}','${body.id_unidad_medida}') RETURNING *`)
        return crop
    } catch (error) {
        console.log('POST Database Error: '+error)
        return error
    }
}

//PUT
export async function putServiceCrop(id,body) {
    try {
        const crop = await pgpConnection.one(`UPDATE gestiona.cultivo SET nombre_cultivo ='${body.nombre_cultivo}', tipo_siembra='${body.tipo_siembra}', fecha_inicio='${body.fecha_inicio}', area_terreno=${body.area_terreno}, proyecto_id='${body.proyecto_id}',id_unidad_medida='${body.id_unidad_medida}' WHERE id='${id}' RETURNING * `)
        return crop
    } catch (error) {
        console.log('PUT Database Error: '+error)
        return error
    }
}

//DELETE
export async function deleteServiceCrop(id) {
    try {
        const crop = await pgpConnection.one(`DELETE FROM gestiona.cultivo WHERE id='${id}' RETURNING *`)
        return crop
    } catch (error) {
        console.log('DELETE Database Error: '+error)
        return error
    }
}