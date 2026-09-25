const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

const familyService = require('../services/familyService');
const parseBody = require('../utils/parseBody');

async function getAllFamilies(req, res) {

    try {

        const families = await familyService.getAllFamilies();

        const filepath = path.join(
            __dirname,
            '..',
            '..',
            'views',
            'pages',
            'families.ejs'
        );

        const template = fs.readFileSync(filepath, 'utf-8');

        const html = ejs.render(
            template,
            {
                families: families
            },
            {
                filename: filepath
            }
        );

        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        res.end(html);

    } catch (error) {

        console.error(error);

        res.writeHead(500, {
            'Content-Type': 'text/html'
        });

        res.end(`
            <h1>500 - Server Error</h1>
            <p>Unable to load families.</p>
            <pre>${error.message}</pre>
        `);
    }
}

async function getFamilyById(req, res, params) {

    try {

        const id = Number(params.id);

        const family = await familyService.getFamilyById(id);

        if (!family) {

            res.writeHead(404, {
                'Content-Type': 'text/html'
            });

            return res.end(`
                <h1>404 - Not Found</h1>
                <p>Family not found.</p>
                <a href="/families">Back to families</a>
            `);
        }

        const filepath = path.join(
            __dirname,
            '..',
            '..',
            'views',
            'pages',
            'family-detail.ejs'
        );

        const template = fs.readFileSync(filepath, 'utf-8');

        const html = ejs.render(
            template,
            {
                family: family
            },
            {
                filename: filepath
            }
        );

        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        res.end(html);

    } catch (error) {

        console.error(error);

        res.writeHead(500, {
            'Content-Type': 'text/html'
        });

        res.end(`
            <h1>500 - Server Error</h1>
            <p>Unable to load family.</p>
            <pre>${error.message}</pre>
        `);
    }
}

async function createFamily(req, res) {

    try {

        const data = await parseBody(req);

        await familyService.createFamily(
            data.name,
            data.quotient_familial || null
        );

        res.writeHead(302, {
            Location: '/families'
        });

        res.end();

    } catch (error) {

        console.error(error);

        res.writeHead(500, {
            'Content-Type': 'text/html'
        });

        res.end(`
            <h1>500 - Server Error</h1>
            <p>Unable to create family.</p>
            <pre>${error.message}</pre>
        `);
    }
}

async function updateFamily(req, res, params) {

    try {

        const data = await parseBody(req);

        const id = Number(params.id);

        await familyService.updateFamily(
            id,
            data.name,
            data.quotient_familial || null
        );

        res.writeHead(302, {
            Location: `/families/${id}`
        });

        res.end();

    } catch (error) {

        console.error(error);

        res.writeHead(500, {
            'Content-Type': 'text/html'
        });

        res.end(`
            <h1>500 - Server Error</h1>
            <p>Unable to update family.</p>
            <pre>${error.message}</pre>
        `);
    }
}

async function deleteFamily(req, res, params) {

    try {

        const id = Number(params.id);

        const family = await familyService.deleteFamily(id);

        if (!family) {

            res.writeHead(404, {
                'Content-Type': 'text/html'
            });

            return res.end(`
                <h1>404 - Not Found</h1>
                <p>Family not found.</p>
                <a href="/families">Back to families</a>
            `);
        }

        res.writeHead(302, {
            Location: '/families'
        });

        res.end();

    } catch (error) {

        console.error(error);

        res.writeHead(500, {
            'Content-Type': 'text/html'
        });

        res.end(`
            <h1>500 - Server Error</h1>
            <p>Unable to delete family.</p>
            <pre>${error.message}</pre>
        `);
    }
}

module.exports = {
    getAllFamilies,
    getFamilyById,
    createFamily,
    updateFamily,
    deleteFamily
};
