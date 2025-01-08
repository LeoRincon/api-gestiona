import { 
  getAllServiceUsers, 
  getServiceUsers, 
  postServiceUsers, 
  updateServiceUsers, 
  deleteServiceUsers 
} from "../services/user.js";

// Obtener todos los usuarios
export async function getAllUsers(req, res) {
  try {
    const datos = await getAllServiceUsers();
    if (datos.error) {
      return res.status(500).json({ success: false, data: null, message: datos.error });
    }
    res.status(200).json({ success: true, data: datos, message: 'Users fetched successfully' });
  } catch (error) {
    console.error('Error en getAllUsers:', error);
    res.status(500).json({ success: false, data: null, message: 'Internal server error while fetching users' });
  }
}

// Obtener usuario por ID
export async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const datos = await getServiceUsers(id);
    if (!datos) {
      return res.status(404).json({ success: false, data: null, message: 'User not found' });
    }
    res.status(200).json({ success: true, data: datos, message: 'User fetched successfully' });
  } catch (error) {
    console.error('Error en getUserById:', error);
    res.status(500).json({ success: false, data: null, message: 'Internal server error while fetching user by ID' });
  }
}

// Crear un nuevo usuario
export async function createUser(req, res) {
  try {
    const cuerpo = req.body;
    console.log(cuerpo);
    const datos = await postServiceUsers(cuerpo);
    if (datos.error) {
      return res.status(400).json({ success: false, data: null, message: datos.error });
    }
    res.status(201).json({ success: true, data: datos, message: 'User created successfully' });
  } catch (error) {
    console.error('Error en createUser:', error);
    res.status(500).json({ success: false, data: null, message: 'Internal server error while creating user' });
  }
}

// Actualizar un usuario
export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const body = req.body;
    const datos = await updateServiceUsers(id, body);
    if (!datos) {
      return res.status(404).json({ success: false, data: null, message: 'User not found or update failed' });
    }
    res.status(200).json({ success: true, data: datos, message: 'User updated successfully' });
  } catch (error) {
    console.error('Error en updateUser:', error);
    res.status(500).json({ success: false, data: null, message: 'Internal server error while updating user' });
  }
}

// Eliminar un usuario
export async function deleteUserById(req, res) {
  try {
    const { id } = req.params;
    const datos = await deleteServiceUsers(id);
    if (!datos) {
      return res.status(404).json({ success: false, data: null, message: 'User not found or deletion failed' });
    }
    res.status(200).json({ success: true, data: datos, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error en deleteUserById:', error);
    res.status(500).json({ success: false, data: null, message: 'Internal server error while deleting user' });
  }
}
