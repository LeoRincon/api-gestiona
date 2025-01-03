import { Router } from "express";
import * as expensesController from "../controllers/expenses.js";
import validateID from "../middlewares/validateID.js";
import { verifyExpenses } from "../middlewares/ValidateExpenses.js";

const expensesRouter = Router();

expensesRouter.get('/', expensesController.getAllexpensesController);
expensesRouter.get('/:id', validateID, expensesController.getExpenseController);
expensesRouter.post('/', verifyExpenses, expensesController.postExpenseController);
expensesRouter.put('/:id', validateID, verifyExpenses, expensesController.putExpenseController);
expensesRouter.delete('/:id', validateID, expensesController.deleteExpenseController);

export default expensesRouter;