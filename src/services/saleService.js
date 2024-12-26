import { pgpConnection } from "../db.js";

//GET
export async function getServiceAllsale() {
 
  try {
    const sale =
      await pgpConnection.manyOrNone(`SELECT * FROM gestiona.venta`);

    return sale;
  } catch (error) {
    console.log("GET Database Error: " + error);
    return error;
  }
}
// GET UNIDAD DE MEDIDA
export async function getServiceUnit() {
 
  try {
    const sale = await pgpConnection.manyOrNone(`SELECT * FROM gestiona.unidad_medida`);

    return sale;
  } catch (error) {
    console.log("GET Database Error: " + error);
    return error;
  }
}



//POST
export async function postServiceSale(body) {
  try {
    const sale =
      await pgpConnection.one(`INSERT INTO gestiona.venta(cantidad_vendida, precio_total,fecha_venta,id_temporada,observaciones,id_unidad_medida,precio_unitario)
                                    VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
                                  [
                                    body.cantVenta,
                                    body.preciTotal,
                                    body.fechaVenta,
                                    body.idTempo,
                                    body.obsv,
                                    body.idUnidadMed,
                                    body.preciUnitario

                                  ]);
    return sale;
  } catch (error) {
    console.log("POST Database Error: " + error);
    return error;
  }
}

//PUT // update
export async function putServiceSale(id,body) {
  try {
    const sale = await pgpConnection.one(
      `UPDATE gestiona.venta SET cantidad_vendida=$1 ,precio_total=$2 ,fecha_venta=$3 ,id_temporada=$4 ,observaciones=$5 ,id_unidad_medida=$6 ,precio_unitario=$7 WHERE id=$8 RETURNING * `,
    
    [
      body.cantVenta,
      body.preciTotal,
      body.fechaVenta,
      body.idTempo,
      body.obsv,
      body.idUnidadMed,
      body.preciUnitario,
      id
    ]);

    return sale;
  } catch (error) {
    console.log("PUT Database Error: " + error);
    return error;
  }
}

//DELETE
export async function deleteServiceSale(id) {
  try {
    const sale = await pgpConnection.one(
      `DELETE FROM gestiona.venta WHERE id='${id}' RETURNING*`
    );
    return sale;
  } catch (error) {
    console.log("DELETE Database Error: " + error);
    return error;
  }
}
