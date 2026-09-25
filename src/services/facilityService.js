const pool = require('../config/db');


async function getAllFacilities() {
    const result = await pool.query(
        `
        SELECT id, name, type,erp_capacity,address,is_divisible FROM facility ORDER BY id ASC `
    );

    return result.rows;
}




async function getFacilityById(id) {
    const result = await pool.query(
        `
        SELECT id, name, type, erp_capacity, address, is_divisible FROM facility  WHERE id = $1
        `,
        [id]
    );

    return result.rows[0];
}



async function createFacility(data) {
    const result = await pool.query(
        `
        INSERT INTO facility (name,type, erp_capacity, address, is_divisible)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `,
        [data.name, data.type, data.erp_capacity, data.address, data.is_divisible]
    );

    return result.rows[0];
}



async function updateFacility(data) {
    const result = await pool.query(
        `
        UPDATE facility
        SET name = $1, type = $2,erp_capacity = $3,address = $4, is_divisible = $5
        WHERE id = $6
        RETURNING *
        `,
        [data.name, data.type, data.erp_capacity, data.address, data.is_divisible, data.id]
    );

    return result.rows[0];
}

async function deleteFacility(id) {
    const result = await pool.query(
        `
        DELETE FROM facility
        WHERE id = $1
        RETURNING *
        `,
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