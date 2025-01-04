import { Router } from "express";
import * as expensesController from "../controllers/expenses.js";
import validateID from "../middlewares/validateID.js";
import { verifyExpenses } from "../middlewares/ValidateExpenses.js";

const expensesRouter = Router();

expensesRouter.get('/expenses', expensesController.getAllexpensesController);
expensesRouter.get('/expenses/:id', validateID, expensesController.getExpenseController);
expensesRouter.post('/expenses', verifyExpenses, expensesController.postExpenseController);
expensesRouter.put('/expenses/:id', validateID, verifyExpenses, expensesController.putExpenseController);
expensesRouter.delete('/expenses/:id', validateID, expensesController.deleteExpenseController);

export default expensesRouter;