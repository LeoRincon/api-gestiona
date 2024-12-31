import { pgpConnection } from '../db.js';

const TABLE = 'gestiona.gestion_actividades';
export async function getServiceActivitiesManagement() {
 try {
  const projects = await pgpConnection.manyOrNone(`SELECT * FROM ${TABLE}`);
  return projects;
 } catch (error) {
  console.log('Projects not found ' + error);
  return error;
 }
}

export async function getServiceActivitiesManagementByID(id) {
 if (!id) {
  throw new Error('Id is required');
 }
 const ID = id.toString();

 try {
  const projects = await pgpConnection.one(
   `select * from ${TABLE} WHERE id = '${ID}'`
  );
  return projects;
 } catch (error) {
  return error;
 }
}

export async function createServiceActivitiesManagement(data) {
 const { id_actividad, id_temporada, costo, gasto_insumo_id } = data;
 try {
  const projectCreated = await pgpConnection.one(
   `INSERT INTO ${TABLE} (id_actividad, id_temporada, costo, gasto_insumo_id) 
       VALUES ($[id_actividad], $[id_temporada], $[costo], $[gasto_insumo_id]) RETURNING *;`,
   {
    id_actividad,
    id_temporada,
    costo,
    gasto_insumo_id,
   }
  );
  return projectCreated;
 } catch (error) {
  return error;
 }
}

export async function deleteServiceActivityManagement(id) {
 if (!id) {
  throw new Error('Id is required');
 }
 const ID = id.toString();

 try {
  const activityManagementDeleted = await pgpConnection.one(
   `DELETE FROM ${TABLE} WHERE id='${ID}' RETURNING*`
  );

  return activityManagementDeleted;
 } catch (error) {
  return error;
 }
}

export async function putServiceActivityManagement(id, data) {
 if (!id || !data || typeof data !== 'object') {
  throw new Error('Both id and data (as an object) are required');
 }

 const ID = id.toString();
 const columns = Object.keys(data);
 const values = Object.values(data);

 if (columns.length === 0) {
  throw new Error('Data object must have at least one key-value pair');
 }

 const setClause = columns
  .map((col, index) => `${col} = $${index + 1}`)
  .join(', ');

 try {
  const query = `
      UPDATE ${TABLE}
      SET ${setClause}
      WHERE id = $${columns.length + 1}
      RETURNING *;
    `;

  const updatedActivityManagement = await pgpConnection.one(query, [
   ...values,
   ID,
  ]);
  return updatedActivityManagement;
 } catch (error) {
  throw new Error(`Error updating project: ${error.message}`);
 }
}
