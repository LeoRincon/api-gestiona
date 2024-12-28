import { 
    getAllSuppliesServices, 
    getSupplyService, 
    postSupplyService, 
    putSupply, 
    deleteSupply 
} from "../services/supplies.js";

export async function getSuppliesController(req, res) {
    try {
        const supplies = await getAllSuppliesServices();

        if (supplies.name === 'error') {
            return res.status(404).json({
                success: false,
                message: supplies.message
            });
        }
        return res.status(200).json({
            success: true,
            data: supplies
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Error in obtaining inputs'
        });
    }
}

export async function getSupplyController(req, res) {
    try {
      const { id } = req.params; 

      if (!id) {
        return res.status(400).json({
            success: false,
            message: 'ID is required'
        });
    }

      const supply = await getSupplyService(id);

      if (supply.name === 'error') {
            return res.status(404).json({
                success: false,
                message: supply.message
            });
        }
      res.status(200).json({
        success: true,
        data: supply,
      });
    } 
    catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || 'Error in obtaining input',
      });
    }
  }



  export async function postSupplyController(req, res) {
    try {
        const data = req.body;

        if (!data || !Object.keys(data).length) {
            return res.status(400).json({
                success: false,
                message: 'Required data'
            });
        }

        const supply = await postSupplyService(data);

        if (supply.name === "error") {
            throw new Error(supply.message);
        }

        res.status(201).json({
            success: true, 
            supply
        });
    } 
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error when creating the supply',
            error: error.message
        });
    }
}

export async function putSupplyController(req, res) {
    try {
        const { id } = req.params;
        const data = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'ID is required'
            });
        }

        if (!data || !Object.keys(data).length) {
            return res.status(400).json({
                success: false,
                message: 'Data required to update'
            });
        }

       // Calls the function that performs the update in the database
        const supply = await putSupply(id, data);

        if (supply.name === "error") {
            throw new Error(supply.message);
        }

        res.status(200).json({
            success: true,
            supply
        });
    } 
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating the input',
            error: error.message
        });
    }
}
 
export async function deleteSupplyController(req, res) {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'ID es requerido'
            });
        }

        const supply = await deleteSupply(id);

        if (supply.name === "error") {
            throw new Error(supply.message);
        }

        res.status(200).json({
            success: true,
            supply
        });
    } 
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error when deleting the input',
            error: error.message
        });
    }
}
