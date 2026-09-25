const pool = require("../config/db");

async function getAllMember() {
    const result = await pool.query(`
        SELECT *
        FROM member
        ORDER BY id ASC
    `);

    return result.rows;
}
module.exports ={
    getAllMember
}