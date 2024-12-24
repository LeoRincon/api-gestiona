import { getServiceCrops, getServiceCrop, postServiceCrop, putServiceCrop, deleteServiceCrop } from "../services/crop.js"

//GET ALL
export async function getCrops(req,res){
    try {
        const crops = await getServiceCrops()
        if(crops.name == "error") throw Error(crops)
        res.status(200).json({success: true, crops:crops})
    } catch (error) {
        console.log('GET controller Error'+error)
        res.status(400).send('Error fetching information from the database.')
    }
}

//GET ONE ID
export async function getCrop(req,res){
    try {
        const {id} = req.params;
        const crop = await getServiceCrop(id)
        if(crop.name == "error") throw Error(crop)
        res.status(200).json({success: true, crop:crop})
    } catch (error) {
        console.log('GET controller Error'+error)
        res.status(400).send('Error fetching information from the database.')
    }
}

//POST
export async function postCrop(req,res){
    try {
        const data = req.body;
        const crop = await postServiceCrop(data)
        if(crop.name == "error") throw Error(crop)
        res.status(200).json({success: true, crop:crop})
    } catch (error) {
        console.log('POST controller Error'+error)
        res.status(400).send('Error creating database information')
    }
}

//PUT
export async function putCrop(req,res){
    try {
        const {id} = req.params;
        const data = req.body;
        const crop = await putServiceCrop(id,data)
        if(crop.name == "error") throw Error(crop)
        res.status(200).json({success: true, crop:crop})
    } catch (error) {
        console.log('PUT controller Error:'+error)
        res.status(400).send('Error editing database information')
    }
}

//DELETE
export async function deleteCrop(req,res){
    try {
        const {id} = req.params
        const crop = await deleteServiceCrop(id)
        if(crop.name == "error") throw Error(crop)
        res.status(200).json({success: true, crop:crop})
    } catch (error) {
        console.log('DELETE controller Error: '+error)
        res.status(400).send('Error deleting information from the database')
    }
}