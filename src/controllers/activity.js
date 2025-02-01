import { TABLE } from "../conts.js";
import { getAllRows } from "../services/getAllRows.js";
import { getRowByID } from "../services/getRowByID.js";
import { createDataRow } from "../services/createDataRow.js";
import { updatedDataRowByID } from "../services/updatedDataRowByID.js";
import { deleteRowByID } from "../services/deleteRowByID.js";

const table = TABLE.activity;
const categoryTable = TABLE.category;
//GET
export async function getActivities(req, res) {
  try {
    const activities = await getAllRows(table);
    if (activities.name == "error") throw Error(activity);

    const newActivities = await Promise.all(
      activities.map(async (activity) => {
        const category = await getRowByID(activity.id_categoria, categoryTable);
        activity["category"] = category;
        return activity;
      })
    );

    res.status(200).json({ success: true, activities: newActivities });
  } catch (error) {
    console.log("GET controller Error" + error);
    res.status(404).send("Error fetching information.");
  }
}

//GET ONE ID
export async function getActivity(req, res) {
  try {
    const { id } = req.params;
    const activity = await getRowByID(id, table);
    if (activity.name == "error") throw Error(activity);
    res.status(200).json({ success: true, activity: activity });
  } catch (error) {
    console.log("GET controller Error" + error);
    res.status(404).send("Error fetching information.");
  }
}

//POST
export async function postActivity(req, res) {
  try {
    const data = req.body;
    const activity = await createDataRow(data, table);
    if (activity.name == "error") throw Error(activity);
    res.status(201).json({ success: true, activity: activity });
  } catch (error) {
    console.log("POST controller Error" + error);
    res.status(404).send("Error creating information.");
  }
}

//PUT
export async function putActivity(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;
    const activity = await updatedDataRowByID(id, data, table);
    if (activity.name == "error" || activity.name == "QueryResultError")
      throw Error(activity);
    res.status(200).json({ success: true, activity: activity });
  } catch (error) {
    console.log("PUT controller Error:" + error);
    res.status(404).send("Error editing information.");
  }
}

//DELETE
export async function deleteActivity(req, res) {
  try {
    const { id } = req.params;
    const activity = await deleteRowByID(id, table);
    console.log(typeof activity, activity);
    if (activity.name == "error" || activity.name == "QueryResultError")
      throw Error(activity);
    res.status(200).json({ success: true, activity: activity });
  } catch (error) {
    console.log("DELETE controller error: " + error);
    res.status(404).send("Error deleting information.");
  }
}
