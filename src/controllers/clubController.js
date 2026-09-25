const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

const clubService = require('../services/clubService');

const parseBody = require('../utils/parseBody');


async function getAllClubs(req, res) {

    try {

        const clubs = await clubService.getAllClubs();

        const filepath = path.join(__dirname, '..', '..', 'views', 'pages', 'clubs.ejs');

        const template = fs.readFileSync(filepath, 'utf-8');

        const html = ejs.render(template,
            {
                clubs: clubs
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

      

        res.writeHead(500, {
            'Content-Type': 'text/html'
        });

        res.end(`
            <h1>500 - Server Error</h1>
            <p>Unable to load clubs.</p>
            <pre>${error.message}</pre>
        `);
    }
}



async function getClubById(req, res, params) {

    try {

        const club = await clubService.getClubById(Number(params.id));

        if (!club) {

            const filepath = path.join(__dirname, '..', '..', 'views', 'pages', 'error.ejs');

            const template = fs.readFileSync(filepath, 'utf-8');

            const html = ejs.render(
                template,
                {
                    statusCode: 404,
                    message: 'Club introuvable'
                },
                {
                    filename: filepath
                }
            );

            res.writeHead(404, {
                'Content-Type': 'text/html'
            });

            return res.end(html);
        }


        const filepath = path.join(__dirname, '..', '..', 'views', 'pages', 'clubs-detail.ejs');

        const template = fs.readFileSync(filepath, 'utf-8');

        const html = ejs.render(template,
            {
                club: club
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
            <p>Unable to load club.</p>
            <pre>${error.message}</pre>
        `);
    }
}



async function createClub(req, res) {

    try {


        const data = await parseBody(req);
        console.log(data);


        await clubService.createClub(data);

        res.writeHead(302, {
            'Location': '/clubs'
        });

        res.end();

    } catch (error) {

        console.error(error);

        res.writeHead(500, {
            'Content-Type': 'text/html'
        });

        res.end(`
            <h1>500 - Server Error</h1>
            <p>Unable to create club.</p>
            <pre>${error.message}</pre>
        `);
    }
}



async function updateClub(req, res, params) {

    try {

        const data = await parseBody(req);

        const id = Number(params.id);

        await clubService.updateClub(id, data);

        res.writeHead(302, {
            'Location': `/clubs/${id}`
        });

        res.end();

    } catch (error) {

        console.error(error);

        res.writeHead(500, {
            'Content-Type': 'text/html'
        });

        res.end(`
            <h1>500 - Server Error</h1>
            <p>Unable to update club.</p>
            <pre>${error.message}</pre>
        `);
    }
}



async function deleteClub(req, res, params) {

    try {

        const club = await clubService.deleteClub(params.id);

        if (!club) {

            res.writeHead(404, {
                'Content-Type': 'text/html'
            });

            return res.end(`
                <h1>404 - Not Found</h1>
                <p>Club introuvable.</p>
            `);
        }

        res.writeHead(302, {
            'Location': '/clubs'
        });

        res.end();

    } catch (error) {

        console.error(error);

        res.writeHead(500, {
            'Content-Type': 'text/html'
        });

        res.end(`
            <h1>500 - Server Error</h1>
            <p>Unable to delete club.</p>
            <pre>${error.message}</pre>
        `);
    }
}




module.exports = {
    getAllClubs,
    getClubById,
    createClub,
    updateClub,
    deleteClub
};