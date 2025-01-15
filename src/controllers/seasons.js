import { TABLE } from '../conts.js';
import { getAllRows } from '../services/getAllRows.js';
import { getRowByID } from '../services/getRowByID.js';
import { createDataRow } from '../services/createDataRow.js';
import { updatedDataRowByID } from '../services/updatedDataRowByID.js';
import { deleteRowByID } from '../services/deleteRowByID.js';

const table = TABLE.season;
export async function getAll(_req, res) {
 try {
  const seasons = await getAllRows(table);
  if (!seasons) return res.status(404).json({ error: seasons.message });
  res.json(seasons);
 } catch (error) {
  console.log('GET Controller error.', error);
  res.status(500).json({ error: 'Error fetching information.' });
 }
}

export async function getAllByIdCrop(req, res) {
 const { id } = req.params;
 if (!id) return res.status(400).json({ error: 'The crop id is required.' });

 try {
  const seasons = await getRowByID(id, table);
  if (!seasons) return res.status(404).json({ error: seasons.message });
  res.status(200).json(seasons);
 } catch (error) {
  console.log('GET Controller error.', error);
  res.status(500).json({ error: 'Error fetching information.' });
 }
}

export async function getById(req, res) {
 const { id } = req.params;
 if (!id) return res.status(400).json({ error: 'The season id is required.' });
 try {
  const season = await getRowByID(id, table);
  if (!season) return res.status(404).json({ error: season.message });
  res.status(200).json(season);
 } catch (error) {
  console.log('Error fetching information.', error.message);
  res.status(500).json({ error: 'Error fetching information.' });
 }
}

export async function createSeason(req, res) {
 const season = req.body;
 if (!season) return res.status(400).json({ error: 'The season is required.' });
 try {
  const newSeason = await createDataRow(season, table);
  res.status(201).json(newSeason);
 } catch (error) {
  console.log('Error saving data to the database.', error);
  res.status(500).json({ error: 'Error saving data.' });
 }
}

export async function deleteSeason(req, res) {
 const { id } = req.params;
 if (!id) return res.status(400).json({ error: 'The season id is required.' });
 try {
  const result = await deleteRowByID(id, table);
  res.json(result);
 } catch (error) {
  console.log('Error removing data.', error);
  res.status(500).json({ error: 'Error removing data.' });
 }
}

export async function modifySeason(req, res) {
 const { id } = req.params;
 const season = req.body;
 if (!id) return res.status(400).json({ error: 'The season id is required.' });
 if (!season) return res.status(400).json({ error: 'The season is required.' });
 try {
  const updatedSeason = await updatedDataRowByID(id, season, table);
  res.json(updatedSeason);
 } catch (error) {
  console.log('Error updating data in the database.', error);
  res.status(500).json({ error: 'Error modifying data.' });
 }
}
