import { getServiceVenta } from "../../services/venta/serviceVenta.js";

export  async function getVenta(req, res) {
  try {
    const data = await getServiceVenta();
    res.send(data);
 } catch (error) {
    res.status(500).send("Error al obtener los datos");
  }
}