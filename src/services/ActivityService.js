const pool = require("../config/db");

async function getAllActivities() {
    const result = await pool.query(`
        SELECT
            a.*,
            f.name AS facility_name,
            c.name AS club_name
        FROM activity a
        JOIN facility f ON a.facility_id = f.id
        JOIN club c ON a.club_id = c.id
        ORDER BY a.id ASC
    `);

    return result.rows;
}

async function getActivityById(id) {
    const result = await pool.query(`
        SELECT
            a.*,
            f.name AS facility_name,
            c.name AS club_name
        FROM activity a
        JOIN facility f ON a.facility_id = f.id
        JOIN club c ON a.club_id = c.id
        WHERE a.id = $1
    `, [id]);

    return result.rows[0];
}

async function createActivity(data) {
    const result = await pool.query(`
        INSERT INTO activity (
            name,
            description,
            base_price,
            max_capacity,
            age_category,
            day_of_week,
            start_time,
            end_time,
            medical_validity_years,
            facility_id,
            club_id
        )
        VALUES (
            $1, $2, $3, $4, $5,
            $6, $7, $8, $9, $10, $11
        )
        RETURNING *
    `, [
        data.name,
        data.description,
        data.base_price,
        data.max_capacity,
        data.age_category,
        data.day_of_week,
        data.start_time,
        data.end_time,
        data.medical_validity_years,
        data.facility_id,
        data.club_id
    ]);

    return result.rows[0];
}

async function updateActivity(data,id) {
    const result = await pool.query(`
        UPDATE activity
        SET
            name = $1,
            description = $2,
            base_price = $3,
            max_capacity = $4,
            age_category = $5,
            day_of_week = $6,
            start_time = $7,
            end_time = $8,
            medical_validity_years = $9,
            facility_id = $10,
            club_id = $11
        WHERE id = $12
        RETURNING *
    `, [
        data.name,
        data.description,
        data.base_price,
        data.max_capacity,
        data.age_category,
        data.day_of_week,
        data.start_time,
        data.end_time,
        data.medical_validity_years,
        data.facility_id,
        data.club_id,
        id
    ]);

    return result.rows[0];
}

async function deleteActivity(id) {
    const result = await pool.query(`
        DELETE FROM activity
        WHERE id = $1
        RETURNING *
    `, [id]);

    return result.rows[0];
}

module.exports = {
    getAllActivities,
    getActivityById,
    createActivity,
    updateActivity,
    deleteActivity
};