const connection = require("../configs/database");
const getExports = async (startDate, endDate) => {
  let [exports] = await connection.query(
    `SELECT e.id, e.name AS exportName, ed.name_product AS productName, ed.quantity_product AS quantity, e.created_at 
       FROM exports e
       INNER JOIN exportDetails ed ON e.name = ed.name_export
       WHERE e.created_at BETWEEN ? AND ?`,
    [startDate, endDate]
  );
  return exports;
};
const getImports = async (startDate, endDate) => {
  let [imports] = await connection.query(
    `SELECT i.id, i.name AS importName, id.name_product AS productName, id.quantity_product AS quantity, i.created_at 
       FROM imports i
       INNER JOIN importDetails id ON i.name = id.name_import
       WHERE i.created_at BETWEEN ? AND ?`,
    [startDate, endDate]
  );
  return imports;
};
module.exports = { getExports, getImports };
