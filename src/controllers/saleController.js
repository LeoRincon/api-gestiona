import { getServiceAllsale,getServiceUnit,postServiceSale, deleteServiceSale, putServiceSale} from "../services/saleService.js";

//GET all sales
export async function getAllsale(req, res){
    try {
      const sale = await getServiceAllsale()          
      res.status(200).json({success:true,sale})
      
    } catch (error) {
        console.log('GET controller Error'+error)
        res.status(400).send('Error fetching information from the database.')
    }
}
export async function getUnit(req, res){
  try {
    const sale = await getServiceUnit()          
    res.status(200).json({success:true,sale})
    
  } catch (error) {
      console.log('GET controller Error'+error)
      res.status(400).send('Error fetching information from the database.')
  }
}


//POST
export async function postSale(req,res) {
     try {
      const data = req.body;
      const sale = await postServiceSale(data)
      res.status(200).json({success:true,sale})
    } catch (error) {
        console.log('POST controller Error'+error)
        res.status(400).send('Error creating database information')
    }
}

//PUT
export async function putSale(req,res) {
     try {
        const {id} = req.params;
        const data = req.body;
        const sale = await putServiceSale(id,data)
        res.status(200).json({success:true,sale})
    } catch (error) {
        console.log('PUT controller Error:'+error)
        res.status(400).send('Error editing database information')
    }
}

//DELETE
export async function deleteSale(req,res) {
  try {
        const {id} = req.params;
        const sale = await deleteServiceSale(id)
        res.status(200).json({success:true,sale})
    } catch (error) {
        console.log('DELETE controller error: '+error)
        res.status(400).send('Error deleting information from the database')
    } 
}
