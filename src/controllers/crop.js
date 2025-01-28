import { TABLE } from "../conts.js";
import { getAllRows } from "../services/getAllRows.js";
import { getRowByID } from "../services/getRowByID.js";
import { createDataRow } from "../services/createDataRow.js";
import { updatedDataRowByID } from "../services/updatedDataRowByID.js";
import { deleteRowByID } from "../services/deleteRowByID.js";
import { getRowsByKey } from "../services/getDataByKeyParam.js";

const table = TABLE.crop;
const unitTable = TABLE.unitMeasurement;
//GET ALL
export async function getCrops(req, res) {
  try {
    const crops = await getAllRows(table);
    if (crops.name == "error") throw Error(crops);

    const newCrops = await Promise.all(
      crops.map(async (crop) => {
        const unit = await getRowByID(crop.id_unidad_medida, unitTable);
        crop["unit"] = {
          nombre: unit.nombre,
          unidad: unit.unidad,
          descripcion: unit.descripcion,
        };
        return crop;
      })
    );

    console.log("New Crops", newCrops);

    res.status(200).json({ success: true, crops: newCrops });
  } catch (error) {
    console.log("GET controller Error" + error);
    res.status(404).send("Error fetching information.");
  }
}

//GET ONE ID
export async function getCrop(req, res) {
  try {
    const { id } = req.params;
    const crop = await getRowByID(id, table);
    if (crop.name == "error") throw Error(crop);
    res.status(200).json({ success: true, crop: crop });
  } catch (error) {
    console.log("GET controller Error" + error);
    res.status(404).send("Error fetching information.");
  }
}
export async function getCropByProjectId(req, res) {
  try {
    const { id } = req.params;
    const crops = await getRowsByKey("proyecto_id", id, table);
    if (crops.name == "error") throw Error(crops);

    const newCrops = await Promise.all(
      crops.map(async (crop) => {
        const unit = await getRowByID(crop.id_unidad_medida, unitTable);
        crop["unit"] = {
          nombre: unit.nombre,
          unidad: unit.unidad,
          descripcion: unit.descripcion,
        };
        return crop;
      })
    );

    res.status(200).json({ success: true, crops });
  } catch (error) {
    console.log("GET controller Error" + error);
    res.status(404).send("Error fetching information.");
  }
}

//POST
export async function postCrop(req, res) {
  try {
    const data = req.body;
    const crop = await createDataRow(data, table);
    if (crop.name == "error") throw Error(crop);
    const unit = await getRowByID(crop.id_unidad_medida, unitTable);
    crop["unit"] = {
      nombre: unit.nombre,
      unidad: unit.unidad,
      descripcion: unit.descripcion,
    };
    res.status(200).json({ success: true, crop: crop });
  } catch (error) {
    console.log("POST controller Error" + error);
    res.status(404).send("Error creating information.");
  }
}

//PUT
export async function putCrop(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;
    const crop = await updatedDataRowByID(id, data, table);
    if (crop.name == "error" || crop.name == "QueryResultError")
      throw Error(crop);
    res.status(200).json({ success: true, crop: crop });
  } catch (error) {
    console.log("PUT controller Error:" + error);
    res.status(404).send("Error editing information.");
  }
}

//DELETE
export async function deleteCrop(req, res) {
  try {
    const { id } = req.params;
    const crop = await deleteRowByID(id, table);
    if (crop.name == "error" || crop.name == "QueryResultError")
      throw Error(crop);
    res.status(200).json({ success: true, crop: crop });
  } catch (error) {
    console.log("DELETE controller Error: " + error);
    res.status(404).send("Error deleting information.");
  }
}
