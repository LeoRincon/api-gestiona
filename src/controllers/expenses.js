import { 
    getAllExpensesServices, 
    getExpenseService, 
    postExpenseService, 
    putExpenseService, 
    deleteExpenseService 
} from "../services/expenses.js";

export async function getAllexpensesController (req, res) {
    try {
        const expenses = await getAllExpensesServices();
        return res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving expenses', error });
    }
}

export async function getExpenseController(req, res) {
    try {
        const { id } = req.params; 
        const expense = await getExpenseService(id);
        if (!expense) {
            return res.status(404).json({
                sucess: false,
                message: 'Expense not found',
            });
        }
        res.status(200).json({
            succes: true,
            data: expense,
        });
    }
    catch (error) {
        res.status(500).json({
            succes: false,
            message: 'Error in obtaining the expense',
            error: error.message
        });
    }
    
}

export async function postExpenseController(req, res) {
    try {
        const data = req.body;
        const expense = await postExpenseService(data);
        res.status(201).json({
            succes: true,
            expense
        });
    }
    catch (error) {
        res.status(500).json({
            succes: false,
            messaje: 'Error when creating expense',
            error: error.message
        });
    }
}

export async function putExpenseController(req, res) {
    try {
        const { id } = req.params;
        const data = req.body;
        const expense = await putExpenseService(id, data);

        if (expense.name === "error") {
            throw new Error(expense.message);
        }
        
        res.status(200).json({
            succes: true,
            expense
        });
    }
    catch (error) {
        res.status(500).json({
            succes: false,
            messaje: error.message || 'Error'
        });
    }
}

export async function deleteExpenseController(req, res) {
    try {
        const { id} = req.params;
        const extense = await deleteExpenseService(id);
        
        if (extense.name === "error"){
            throw new Error(extense.message);
        }
        res.status(200).json({
            succes: true,
            extense
        });
    }
    catch (error) {
        res.status(500).json({
            succes: false,
            message: error.false || "error"
        });
    }
    
}