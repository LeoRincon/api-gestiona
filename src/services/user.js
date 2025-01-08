import { pgpConnection } from '../db.js';
import bcrypt from 'bcrypt';

// Obtener todos los usuarios
export async function getAllServiceUsers() {
  try {
    const datos = await pgpConnection.manyOrNone('SELECT * FROM gestiona.usuario');
    return datos;
  } catch (error) {
    console.error('Error en getAllServiceUsers:', error);
    return { error: 'Error fetching users.' };
  }
}

// Obtener usuario por ID
export async function getServiceUsers(id) {
  try {
    const datos = await pgpConnection.oneOrNone('SELECT * FROM gestiona.usuario WHERE id = $1', [id]);
    if (!datos) {
      return { error: 'User not found.' };
    }
    return datos;
  } catch (error) {
    console.error('Error en getServiceUsers:', error);
    return { error: 'Error fetching user by ID.' };
  }
}

// Obtener usuario por email
export async function getServiceUsersByEmail(email) {
  if (!email) return { error: 'The email is required.' };
  try {
    const datos = await pgpConnection.oneOrNone('SELECT * FROM gestiona.usuario WHERE email = $1', [email]);
    if (!datos) {
      return { error: 'No user found.' };
    }
    return datos;
  } catch (error) {
    console.error('Error en getServiceUsersByEmail:', error);
    return { error: 'Error fetching user by email.' };
  }
}

// Crear un nuevo usuario
export async function createUser(body) {
  if (!body) return { error: 'The body data is required.' };

  const { nombre, email, password } = body;

  if (!password) {
    return { error: 'Password is required.' };
  }

  try {
    const datos = await pgpConnection.one(
      'INSERT INTO gestiona.usuario (nombre, email, password_hash, fecha_registro) VALUES ($1, $2, $3, NOW()) RETURNING *',
      [nombre, email, password] // Se utiliza directamente la contraseña sin cifrar
    );
    return datos;
  } catch (error) {
    console.error('Error en postServiceUsers:', error);
    return { error: 'Error creating user.' };
  }
}

export async function postServiceUsers(body) {
  const {nombre, email, password_hash, fecha_registro} = body
  const datos = await pgpConnection.one(
    'INSERT INTO gestiona.usuario (nombre, email, password_hash, fecha_registro) VALUES ($1, $2, $3, $4) RETURNING *',
    [nombre, email, password_hash, fecha_registro]
  );
  return datos;
}




// Actualizar un usuario existente
export async function updateServiceUsers(id, body) {
  try {
    const { nombre, email, password } = body;
    const passwordHashed = password ? await bcrypt.hash(password, 10) : null;

    const datos = await pgpConnection.oneOrNone(
      `UPDATE gestiona.usuario 
       SET nombre = $1, email = $2, password_hash = COALESCE($3, password_hash) 
       WHERE id = $4 RETURNING *`,
      [nombre, email, passwordHashed, id]
    );
    if (!datos) {
      return { error: 'User not found or no changes made.' };
    }
    return datos;
  } catch (error) {
    console.error('Error en updateServiceUsers:', error);
    return { error: 'Error updating user.' };
  }
}

// Eliminar un usuario
export async function deleteServiceUsers(id) {
  try {
    const datos = await pgpConnection.oneOrNone('DELETE FROM gestiona.usuario WHERE id = $1 RETURNING *', [id]);
    if (!datos) {
      return { error: 'User not found.' };
    }
    return datos;
  } catch (error) {
    console.error('Error en deleteServiceUsers:', error);
    return { error: 'Error deleting user.' };
  }
}
