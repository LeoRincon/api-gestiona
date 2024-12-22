import { pgpConnection } from "../db.js";

export async function getAllSuppliesServices() {
  try {
    const supplies = await pgpConnection.manyOrNone('SELECT * FROM gestiona.insumo;')    
   return supplies;
  } catch (error) {
    console.error('Error in project service:', error);
  }
}