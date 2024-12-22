import { pool } from '../db.js'

export async function getAll() {
  const client = await pool.connect();
  try {
    const query = 'SELECT * FROM gestiona.novedades';
    const result = await client.query(query);
    return result.rows;
  } catch (error) {
    console.log('error: ', error);
    throw error;
  } finally {
    client.release();
  }
}

export async function create(obj) {
  const client = await pool.connect();
  try {
    const query = 'INSERT INTO gestiona.novedades (fecha, titulo, descripcion) VALUES ($1, $2, $3) RETURNING *;';
    const values = [obj.fecha, obj.titulo, obj.descripcion];
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.log('error: ', error);
    throw error;
  } finally {
    client.release();
  }
}

export async function getById(id) {
  const client = await pool.connect();
  try {
    const query = 'SELECT * FROM gestiona.novedades WHERE id=$1';
    const values = [id];
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.log('error: ', error);
    throw error;
  } finally {
    client.release();
  }
}

export async function remove(id) {
  const client = await pool.connect();
  try {
    const query = 'DELETE FROM gestiona.novedades WHERE id=$1 RETURNING *';
    const values = [id];
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.log('error: ', error);
    throw error;
  } finally {
    client.release();
  }
}

export async function update(id, obj) {
  const client = await pool.connect();
  try {
    const keys = Object.keys(obj);
    const values = Object.values(obj);
    const attributes = keys.map((key, index) => `${key}=$${index + 1}`).join(', ');
    const query = `UPDATE gestiona.novedades SET ${attributes} WHERE id=$${keys.length + 1} RETURNING *`;
    const result = await client.query(query, [...values, id]);
    return result.rows[0];
  } catch (error) {
    console.log('error: ', error);
    throw error;
  } finally {
    client.release();
  }
}