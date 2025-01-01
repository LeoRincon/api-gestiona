import { pgpConnection } from '../db.js';

const TABLE = 'gestiona.categoria';
export async function getServiceCategories() {
 try {
  const projects = await pgpConnection.manyOrNone(`SELECT * FROM ${TABLE}`);
  return projects;
 } catch (error) {
  console.log('Projects not found ' + error);
  return error;
 }
}

export async function getServiceCategoryByID(id) {
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

export async function createServiceCategory(data) {
 const { nombre, descripcion } = data;
 try {
  const categoryCreated = await pgpConnection.one(
   `INSERT INTO ${TABLE} (nombre, descripcion) 
       VALUES ($[nombre], $[descripcion]) RETURNING *;`,
   {
    nombre,
    descripcion,
   }
  );
  return categoryCreated;
 } catch (error) {
  return error;
 }
}

export async function deleteServiceCategory(id) {
 console.log('🇨🇴🚨 => deleteServiceCategory => id:', id);

 if (!id) {
  throw new Error('Id is required');
 }

 const ID = id.toString();

 try {
  const categoryDeleted = await pgpConnection.one(
   `DELETE FROM ${TABLE} WHERE id='${ID}' RETURNING*`
  );
  return categoryDeleted;
 } catch (error) {
  return error;
 }
}

export async function putServiceCategory(id, data) {
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

  const updatedCategory = await pgpConnection.one(query, [...values, ID]);
  return updatedCategory;
 } catch (error) {
  throw new Error(`Error updating project: ${error.message}`);
 }
}
