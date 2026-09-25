const pool = require("../config/db");

async function getAllFamilies() {
    const result = await pool.query(`
        SELECT *
        FROM family
        ORDER BY id ASC
    `);

    return result.rows;
}

async function getFamilyById(id) {
    const result = await pool.query(`SELECT *FROM family WHERE id = $1`,
        [id]);

    return result.rows[0];
}

async function createFamily(name, quotient_familial) {
    const result = await pool.query(`
        INSERT INTO family (name, quotient_familial)
        VALUES ($1, $2)
        RETURNING *
    `, [name, quotient_familial]);

    return result.rows[0];
}

async function updateFamily(id, name, quotient_familial) {
    const result = await pool.query(`
        UPDATE family
        SET
            name = $1,
            quotient_familial = $2
        WHERE id = $3
        RETURNING *
    `, [name, quotient_familial, id]);

    return result.rows[0];
}

async function deleteFamily(id) {
    const result = await pool.query(`
        DELETE FROM family
        WHERE id = $1
        RETURNING *
    `, [id]);

    return result.rows[0];
}

module.exports = {
    getAllFamilies,
    getFamilyById,
    createFamily,
    updateFamily,
    deleteFamily
};