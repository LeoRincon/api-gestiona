import { getServiceActivities, getServiceActivity, postServiceActivity, deleteServiceActivity, putServiceActivity } from "../services/activity.js";


//GET
export async function getActivities(req, res){
    try {
        const activities = await getServiceActivities()
        if(activities.name == "error") throw Error(activity)
        res.status(200).json({success:true,activities})
    } catch (error) {
        console.log('GET controller Error'+error)
        res.status(400).send('Error fetching information from the database.')
    }
}

//GET ONE ID
export async function getActivity(req,res) {
    try {
        const {id} = req.params; 
        const activity = await getServiceActivity(id)
        if(activity.name == "error") throw Error(activity)
        res.status(200).json({success:true,activity})
    } catch (error) {
        console.log('GET controller Error'+error)
        res.status(400).send('Error fetching information from the database.')
    }
} 

//POST
export async function postActivity(req,res) {
    try {
        const data = req.body;
        const activity = await postServiceActivity(data)
        if(activity.name == "error") throw Error(activity)
        res.status(200).json({success:true,activity})
    } catch (error) {
        console.log('POST controller Error'+error)
        res.status(400).send('Error creating database information')
    }
}

//PUT
export async function putActivity(req,res) {
    try {
        const {id} = req.params;
        const data = req.body;
        const activity = await putServiceActivity(id,data)
        if(activity.name == "error") throw Error(activity)
        res.status(200).json({success:true,activity})
    } catch (error) {
        console.log('PUT controller Error:'+error)
        res.status(400).send('Error editing database information')
    }
}

//DELETE
export async function deleteActivity(req,res) {
    try {
        const {id} = req.params;
        const activity = await deleteServiceActivity(id)
        console.log(typeof activity,activity)
        if(activity.name == "error") throw Error(activity)
        res.status(200).json({success:true,activity})
    } catch (error) {
        console.log('DELETE controller error: '+error)
        res.status(400).send('Error deleting information from the database')
    }
}

