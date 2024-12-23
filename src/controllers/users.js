import { 
  getAllServiceUsers, 
  getServiceUsers, 
  postServiceUsers, 
  updateServiceUsers, 
  deleteServiceUsers 
} from "../services/user.js";

export async function getAllUsers(req, res) {
  const datos = await getAllServiceUsers();
  res.send(datos);
}

export async function getUserById(req, res) {
  const { id } = req.params;
  const datos = await getServiceUsers(id);
  res.send(datos);
}

export async function createUser(req, res) {
  const cuerpo = req.body;
  console.log (cuerpo)
  const datos = await postServiceUsers(cuerpo);
  res.send(datos);
}

export async function updateUser(req, res) {
  const { id } = req.params;
  const body = req.body;
  const datos = await updateServiceUsers(id, body);
  res.send(datos);
}

export async function deleteUserById(req, res) {
  const { id } = req.params;
  const datos = await deleteServiceUsers(id);
  res.send(datos);
}
