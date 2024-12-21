import { getAllSuppliesServices } from "../services/supplies.js"

export async function getAllSuppliesController (req, res) {
    const insumos = await getAllSuppliesServices()
    console.log('controler', insumos)
    res.json(insumos)
}