import { pgpConnection } from "../db.js";


//GET
export async function getServiceActivities() {
    try {
        const activities = await pgpConnection.manyOrNone('SELECT * FROM gestiona.actividad'); 
        console.log(activities) 
        return activities
    } catch (error) {
        console.log('GET Database Error: '+error)
        return error
    }
}

//GET ID
export async function getServiceActivity(id) {
    try {
        const activity = await pgpConnection.oneOrNone(`SELECT * FROM gestiona.actividad WHERE id='${id}'`)
        return activity
    } catch (error) {
        console.log('GET Database Error: '+error)
        return error
    }

} 

//POST
export async function postServiceActivity(body) {
    try {
        const activity = await pgpConnection.one(`INSERT INTO gestiona.actividad(nombre,descripcion,id_categoria)
            VALUES ('${body.nombre}','${body.descripcion}','${body.id_categoria}') RETURNING *`);
        return activity
    } catch (error) {
        console.log('POST Database Error: '+error)
        return error
    }
}

//PUT
export async function putServiceActivity(id,body) {
    try {
        const activity = await pgpConnection.one(`UPDATE gestiona.actividad SET nombre ='${body.nombre}', descripcion ='${body.descripcion} ' WHERE id='${id}' RETURNING * `)
        return activity
    } catch (error) {
        console.log('PUT Database Error: '+error)
        return error
    }
}

//DELETE
export async function deleteServiceActivity(id) {
    try {
        const activity = await pgpConnection.one(`DELETE FROM gestiona.actividad WHERE id='${id}' RETURNING*`)
        return activity
    } catch (error) {
        console.log('DELETE Database Error: '+error)
        return error
    }
}



