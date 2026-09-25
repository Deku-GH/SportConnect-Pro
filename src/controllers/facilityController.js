const ejs = require('ejs');
const path = require('path');
const fs = require('fs');


const facilityService = require("../services/facilityService");
const parseBody = require('../utils/parseBody');






async function getFacilities(req, res) {
    try {
        const facilities = await facilityService.getAllFacilities();

        const filepath = path.join(__dirname, "..", "..", "views", "pages", "facilities.ejs");

        const template = fs.readFileSync(filepath, "utf-8");

        const html = ejs.render(template,
            {
                facilities: facilities
            },
            {
                filename: filepath
            }
        );

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
              <pre>${error.message}</pre>
        `);
    }
}



async function getFacilityById(req, res, params) {
    try {
        const facility = await facilityService.getFacilityById(params.id);

        if (!facility) {
            const filepath = path.join("..", "..", "views", "pages", "error.ejs");

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
            "facilities-detail.ejs"
        );

        const template = fs.readFileSync(filepath, "utf-8");

        const html = ejs.render(template, {
            facility
        },
            {
                filename: filepath
            }
        );

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
            <pre>${error.message}</pre>
        `);
    }
}




async function createFacility(req, res) {

    try {
        const data = await parseBody(req);
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
            <pre>${error.message}</pre>
        `);
    }
}




async function updateFacility(req, res, params) {

    try {

        const data = await parseBody(req);

        data.id = params.id;

        await facilityService.updateFacility(data);

        res.writeHead(302, {
            Location: '/facilities'
        });

        res.end();

    } catch (error) {

        console.error(error);

        res.writeHead(500, {
            'Content-Type': 'text/html'
        });

        res.end(`
            <h1>500 - Server Error</h1>
            <p>Unable to update facility.</p>
            <pre>${error.message}</pre>
        `);
    }
}



async function deleteFacility(req, res, params) {

    try {
        const facility = await facilityService.deleteFacility(params.id);

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
            <pre>${error.message}</pre>
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