const pool = require("../config/db");

async function getAllClubs() {
    const result = await pool.query(
        "SELECT * FROM club ORDER BY id"
    );

    return result.rows;
}

async function getClubById(id) {
    const result = await pool.query(
        "SELECT * FROM club WHERE id = $1",
        [id]
    );

    return result.rows[0];
}

async function createClub(data) {
    
    const result = await pool.query(`
        INSERT INTO club (name, description, contact) VALUES ($1, $2, $3)RETURNING *`,
        [data.name, data.description, data.contact]
    );

    return result.rows[0];
}

async function updateClub(id, data) {
    const result = await pool.query(
        `UPDATE club SET name = $1,description = $2,contact = $3 WHERE id = $4 RETURNING *`,
        [data.name, data.description, data.contact, id]
    );

    return result.rows[0];
}

async function deleteClub(id) {
    const result = await pool.query(
        "DELETE FROM club WHERE id = $1 RETURNING *",
        [id]
    );

    return result.rows[0];
}

module.exports = {
    getAllClubs,
    getClubById,
    createClub,
    updateClub,
    deleteClub
};