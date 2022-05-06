export const getQueryStructure = async (query, connection) => {
  await connection.query(query, function (error, results, fields) {
    if (error) return error;
    // console.log("The solution is: ", results[0].solution);
    return results;
  });
};
