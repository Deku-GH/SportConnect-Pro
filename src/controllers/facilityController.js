const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

const facilityService = require("../services/facilityService");




async function getFacilities(req, res) {
    try {
        const facilities = await facilityService.getAllFacilities();

        const filepath = path.join(__dirname, "..", "..", "views", "pages", "facilities.ejs");

        const template = fs.readFileSync(filepath, "utf-8");

        const html = ejs.render(template, {
            facilities
        });

        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.end(html);

    } catch (error) {
        console.error(error);

        res.writeHead(500, {
            "Content-Type": "text/html"
        });

        res.end(`
            <h1>500 - Server Error</h1>
            <p>Unable to load facilities.</p>
        `);
    }
}


// =========================
// GET FACILITY BY ID
// =========================

async function getFacilityById(req, res, id) {
    try {
        const facility = await facilityService.getFacilityById(id);

        if (!facility) {
            const filepath = path.join(
                __dirname,
                "..",
                "..",
                "views",
                "pages",
                "error.ejs"
            );

            const template = fs.readFileSync(filepath, "utf-8");

            const html = ejs.render(template, {
                statusCode: 404,
                message: "Infrastructure introuvable"
            });

            res.writeHead(404, {
                "Content-Type": "text/html"
            });

            return res.end(html);
        }

        const filepath = path.join(
            __dirname,
            "..",
            "..",
            "views",
            "pages",
            "activity-detail.ejs"
        );

        const template = fs.readFileSync(filepath, "utf-8");

        const html = ejs.render(template, {
            facility
        });

        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.end(html);

    } catch (error) {
        console.error(error);

        res.writeHead(500, {
            "Content-Type": "text/html"
        });

        res.end(`
            <h1>500 - Server Error</h1>
            <p>Unable to load facility.</p>
        `);
    }
}


// =========================
// CREATE FACILITY
// =========================

async function createFacility(req, res, data) {
    try {
        await facilityService.createFacility(data);

        res.writeHead(302, {
            "Location": "/facilities"
        });

        res.end();

    } catch (error) {
        console.error(error);

        res.writeHead(500, {
            "Content-Type": "text/html"
        });

        res.end(`
            <h1>500 - Server Error</h1>
            <p>Unable to create facility.</p>
        `);
    }
}


// =========================
// UPDATE FACILITY
// =========================

async function updateFacility(req, res, id, data) {
    try {
        const facility = await facilityService.updateFacility(id, data);

        if (!facility) {
            res.writeHead(404, {
                "Content-Type": "text/html"
            });

            return res.end(`
                <h1>404 - Not Found</h1>
                <p>Infrastructure introuvable.</p>
            `);
        }

        res.writeHead(302, {
            "Location": `/facilities/${id}`
        });

        res.end();

    } catch (error) {
        console.error(error);

        res.writeHead(500, {
            "Content-Type": "text/html"
        });

        res.end(`
            <h1>500 - Server Error</h1>
            <p>Unable to update facility.</p>
        `);
    }
}


// =========================
// DELETE FACILITY
// =========================

async function deleteFacility(req, res, id) {
    try {
        const facility = await facilityService.deleteFacility(id);

        if (!facility) {
            res.writeHead(404, {
                "Content-Type": "text/html"
            });

            return res.end(`
                <h1>404 - Not Found</h1>
                <p>Infrastructure introuvable.</p>
            `);
        }

        res.writeHead(302, {
            "Location": "/facilities"
        });

        res.end();

    } catch (error) {
        console.error(error);

        res.writeHead(500, {
            "Content-Type": "text/html"
        });

        res.end(`
            <h1>500 - Server Error</h1>
            <p>Unable to delete facility.</p>
        `);
    }
}


module.exports = {
    getFacilities,
    getFacilityById,
    createFacility,
    updateFacility,
    deleteFacility
};