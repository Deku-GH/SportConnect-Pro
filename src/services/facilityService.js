const pool = require("../config/db");

async function getAllFacilities() {
    const result = await pool.query(
        "SELECT * FROM facility ORDER BY id"
    );

    return result.rows;
}

async function getFacilityById(id) {
    const result = await pool.query(
        "SELECT * FROM facility WHERE id = $1",
        [id]
    );

    return result.rows[0];
}

async function createFacility(name, type, erpCapacity, address) {
    const result = await pool.query(
        `INSERT INTO facility 
        (name, type, erp_capacity, address)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [name, type, erpCapacity, address]
    );

    return result.rows[0];
}

async function updateFacility(id, name, type, erpCapacity, address) {
    const result = await pool.query(
        `UPDATE facility
        SET name = $1,
            type = $2,
            erp_capacity = $3,
            address = $4
        WHERE id = $5
        RETURNING *`,
        [name, type, erpCapacity, address, id]
    );

    return result.rows[0];
}

async function deleteFacility(id) {
    const result = await pool.query(
        `DELETE FROM facility
        WHERE id = $1
        RETURNING *`,
        [id]
    );

    return result.rows[0];
}

module.exports = {
    getAllFacilities,
    getFacilityById,
    createFacility,
    updateFacility,
    deleteFacility
};