import { ValidateExpenses } from "../schemas/expenses.js";

export function verifyExpenses(req, res, next) {
    try {
        const body = req.body;

        if (!body || Object.keys(body).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No data provided'
            });
        }

        const data = ValidateExpenses(body);

        if (!data.success) {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: data.error.errors
            });
        }

        req.validatedData = data.data;
        next();

    } catch (error) {
        console.error('[verifyExpenses] Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Data validation error'
        });
    }
}