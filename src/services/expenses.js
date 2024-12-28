import { pgpConnection } from "../db.js";

export async function getAllExpensesServices(){
    try{
        const query = 'SELECT * FROM gestiona.gasto;'
        const expenses = await pgpConnection.manyOrNone(query);

        if (!expenses || expenses.length === 0) {
            return {
                name: 'error',
                message: 'No expenses were found'
            };
        }
        return expenses;
    }
    catch(error){
        console.error('[getAllExpensesServices] Database error:', error.message);
        return {
            name: 'error',
            message: 'Failed to fetch expenses'
        };
    }
}

export async function getExpenseService(id) {
    try{
        if (!id) {
            return {
                name: 'error',
                message: 'ID is required'
            };
        }

        const expense = await pgpConnection.oneOrNone(
            'SELECT * FROM gestiona.gasto WHERE id = $1;', 
            [id]
        );

        if (!expense) {
            return {
                name: 'error',
                message: 'Expense not found'
            };
        }
        return expense;
    }
    catch (error){
        console.error('Error in obtaining the expense:', error);
        return {
            name: 'error',
            message: 'Error in obtaining the expense'
        };
    }
}

export async function postExpenseService(data) {
    try {
        if (!data || !Object.keys(data).length) {
            return {
                name: 'error',
                message: 'Required data'
            };
        }
        const expense = await pgpConnection.one(`
            INSERT INTO gestiona.gasto(
                id_temporada,
                id_insumo,
                cantidad_usada,
                precio_total,
                id_unidad_medida
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `, [
            data.id_temporada,
            data.id_insumo,
            data.cantidad_usada,
            data.precio_total,
            data.id_unidad_medida
        ]);

        return expense;
    } 
    catch (error) {
        console.error('Error in service charges:', error);
        return {
            name: 'error',
            message: error.message
        };
    }
}

export async function putExpenseService(id, body) {
    try {
        if (!id) {
            return {
                name: 'error',
                message: 'ID is required'
            };
        }

        if (!body || !Object.keys(body).length) {
            return {
                name: 'error',
                message: 'Data are required'
            };
        }
        const expense = await pgpConnection.one(`
            UPDATE gestiona.gasto
            SET id_temporada = $1, 
                id_insumo = $2, 
                cantidad_usada = $3, 
                precio_total = $4, 
                id_unidad_medida = $5
            WHERE id = $6
            RETURNING *
        `, [
            body.id_temporada,
            body.id_insumo,
            body.cantidad_usada,
            body.precio_total,
            body.id_unidad_medida,
            id
        ]);
        
        return expense;
    } 
     catch (error) {
    console.error('Error in update:', error);
    return {
        name: 'error',
        message: error.message
    };
}
}

export async function deleteExpenseService(id) {
    try {
        if (!id) {
            return {
                name: 'error',
                message: 'ID is required'
            };
        }
        const expense = await pgpConnection.one(`
            DELETE FROM gestiona.gasto
            WHERE id = $1
            RETURNING * 
            `, id);
            return expense;
    }
    catch (error) {
        console.error('DELETE Database Error:', error);
        return{
            name: "error",
            message: error.message
        };
    }
}