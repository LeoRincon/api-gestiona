import { pool } from './src/db.js'; 
import fs from 'fs'; 
import path from 'path'; 
import { fileURLToPath } from 'url'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runSeed() {
  const seedFilePath = path.join(__dirname, 'seed.sql'); 
  try {
    const sql = fs.readFileSync(seedFilePath, 'utf8'); 
    console.log('Ejecutando el archivo seed.sql...');

    const client = await pool.connect(); 
    await client.query(sql); 
    console.log('La base de datos fue populada correctamente.');

    client.release(); 
  } catch (error) {
    console.error('Error ejecutando seed.sql:', error.message);
  } finally {
    await pool.end();
  }
}

runSeed();

