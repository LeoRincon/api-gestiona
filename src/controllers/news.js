import { getAll, create, getById, remove, update } from "../services/new.js"

export async function getAllNews(req, res) {
    const response = await getAll();
    return res.send(response);
}

export async function createNew(req, res) {
    const response = await create(req.body);
    return res.send(response);
}

export async function getNewById(req, res) {
    const response = await getById(req.params.id);
    return res.send(response);
}

export async function removeNewById(req, res) {
    const response = await remove(req.params.id);
    return res.send(response);
}

export async function updateNew(req, res) {
    const response = await update(req.params.id, req.body);
    return res.send(response);
}



