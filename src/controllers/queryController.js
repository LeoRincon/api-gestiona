import { getDataByKeyParam} from "../services/getDataByKeyParam.js"
export async function getDataByParam(req, res){
  if (!req.body.key || typeof req.body.key !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Key is required',
    });
  }
  if (!req.body.value || typeof req.body.value !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Value is required',
    });
  }
  if (!req.body.table || typeof req.body.table !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Table is required',
    });
  }
  if (!req.body.returnValue || typeof req.body.returnValue !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Return Value is required',
    });
  }

  const { key, value, table, returnValue } = req.body;


  try {
    const data = {}
    data[returnValue] = await getDataByKeyParam( key, value, table, returnValue );
    console.log ("Data => getDataByParam => data", data)
    res.status(200).json({
      success: true,
      data,
    });
    
  } catch (error) {
    console.log("Error => getDataByParam => error", error);
  }


}