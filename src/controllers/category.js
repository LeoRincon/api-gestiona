import {
 getServiceCategories,
 getServiceCategoryByID,
 createServiceCategory,
 deleteServiceCategory,
 putServiceCategory,
} from '../services/category.js';
export async function getCategories(_req, res) {
 const categories = await getServiceCategories();
 return res.json(categories);
}

export async function getCategoryByID(req, res) {
 const { id } = req.params;

 try {
  const category = await getServiceCategoryByID(id);
  return res.json(category);
 } catch (error) {
  return res.status(400).json({
   message: 'validated if is correct the dates',
  });
 }
}

export async function createCategory(req, res) {
 const body = req.body;
 try {
  const categoryCreated = await createServiceCategory(body);
  res.status(200).json(categoryCreated);
 } catch (error) {
  return error;
 }
}

export async function deleteCategory(req, res) {
 const { id } = req.params;
 try {
  const categoryDeleted = await deleteServiceCategory(id);
  return res.status(200).json(categoryDeleted);
 } catch (error) {
  return res.status(400).json({
   message: 'validated if is correct the dates',
  });
 }
}
export async function updatedCategory(req, res) {
 const { id } = req.params;
 const body = req.body;

 try {
  const categoryUpdated = await putServiceCategory(id, body);
  return res.status(200).json(categoryUpdated);
 } catch (error) {
  return res.status(400).json({
   message: 'validated if is correct the dates',
  });
 }
}
