import { Router } from 'express';
import * as expensesController from '../controllers/expenses.js';

const expensesRouter = Router();

expensesRouter.get('/expenses', expensesController.getAllexpensesController);
expensesRouter.get('/expenses/:id', expensesController.getExpenseController);
expensesRouter.post('/expenses', expensesController.postExpenseController);
expensesRouter.put('/expenses/:id', expensesController.putExpenseController);
expensesRouter.delete(
 '/expenses/:id',
 expensesController.deleteExpenseController
);

export default expensesRouter;
