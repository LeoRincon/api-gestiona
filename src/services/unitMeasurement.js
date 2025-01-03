import { pgpConnection } from '../db.js';

//GET ALL
export async function getServiceUnitsMeasurement() {
    try {
        const crops = await pgpConnection.manyOrNone('SELECT * FROM gestiona.unidad_medida')
        return crops
    } catch (error) {
        console.log('GET Database Error: '+error)
        return error
    }
}

//GET ONE ID
export async function getServiceUnitMeasurement(id) {
    try {
        const crop = await pgpConnection.oneOrNone(`SELECT * FROM gestiona.unidad_medida WHERE id='${id}'`)
        return crop
    } catch (error) {
        console.log('GET Database Error: '+error)
        return error
    }
}

//POST
export async function postServiceUnitMeasurement(body) {
    try {
        const crop = await pgpConnection.one(`INSERT INTO gestiona.unidad_medida (unidad,descripcion) VALUES ('${body.unidad}','${body.descripcion}') RETURNING *`) 
        return crop
    } catch (error) {
        console.log('POST Database Error: '+error)
        return error
    }
}

//PUT
export async function putServiceUnitMeasurement(id,body) {
    try {
        const crop = await pgpConnection.one(`UPDATE gestiona.unidad_medida SET unidad ='${body.unidad}', descripcion='${body.descripcion}' WHERE id='${id}' RETURNING * `)
        return crop
    } catch (error) {
        console.log('PUT Database Error: '+error)
        return error
    }
}

//DELETE
export async function deleteServiceUnitMeasurement(id) {
    try {
        const crop = await pgpConnection.one(`DELETE FROM gestiona.unidad_medida WHERE id='${id}' RETURNING *`)
        return crop
    } catch (error) {
        console.log('DELETE Database Error: '+error)
        return error
    }
}