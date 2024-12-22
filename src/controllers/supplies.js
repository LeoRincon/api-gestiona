import { getAllSuppliesServices } from "../services/supplies.js";

export async function getSuppliesController(req, res) {
    const supplies = await getAllSuppliesServices();
    res.status(201).json(supplies);
}