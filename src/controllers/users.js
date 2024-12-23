import { getServiceUsers } from "../services/user.js";

export  async function getUsers(req, res) {
  try {
    const data = await getServiceUsers();
    res.send(data);
 } catch (error) {
    res.status(500).send("Error al obtener los datos");
  }
}
