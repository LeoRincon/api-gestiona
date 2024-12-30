import { Router } from "express";
import * as expensesController from "../controllers/expenses.js";

const expensesRouter = Router();

expensesRouter.get('/', expensesController.getAllexpensesController);
expensesRouter.get('/:id', expensesController.getExpenseController);
expensesRouter.post('/', expensesController.postExpenseController);
expensesRouter.put('/:id', expensesController.putExpenseController);
expensesRouter.delete('/:id', expensesController.deleteExpenseController);

export default expensesRouter;