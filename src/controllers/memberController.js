const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

const memberService = require('../services/memberService');
const FamiliesService = require('../services/familySevice');
const parseBody = require('../utils/parseBody');


async function getAllMember(req, res) {

    try {

        const members = await memberService.getAllMember();
        const families = await FamiliesService.getAllFamilies();

        const filepath = path.join(
            __dirname,
            '..',
            '..',
            'views',
            'pages',
            'members.ejs'
        );

        const template = fs.readFileSync(filepath, 'utf-8');

        const html = ejs.render(
            template,
            {
                members: members,
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
            <p>Unable to load members.</p>
            <pre>${error.message}</pre>
        `);
    }
}


async function getMemberById(req, res, params) {

    try {

        const id = Number(params.id);

        const member = await memberService.getMemberById(id);

        if (!member) {

            res.writeHead(404, {
                'Content-Type': 'text/html'
            });

            return res.end(`
                <h1>404 - Not Found</h1>
                <p>Member not found.</p>
                <a href="/members">Back to members</a>
            `);
        }

        const families = await FamiliesService.getAllFamilies();

        const filepath = path.join(
            __dirname,
            '..',
            '..',
            'views',
            'pages',
            'member-detail.ejs'
        );

        const template = fs.readFileSync(filepath, 'utf-8');

        const html = ejs.render(
            template,
            {
                member: member,
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
            <p>Unable to load member.</p>
            <pre>${error.message}</pre>
        `);
    }
}


async function createMember(req, res) {

    try {

        const data = await parseBody(req);

        const isResident = data.is_resident === 'true';

        await memberService.createMember(
            data.first_name,
            data.last_name,
            data.birth_date,
            data.address,
            isResident,
            data.medical_status,
            data.family_id
        );

        res.writeHead(302, {
            Location: '/members'
        });

        res.end();

    } catch (error) {

        console.error(error);

        res.writeHead(500, {
            'Content-Type': 'text/html'
        });

        res.end(`
            <h1>500 - Server Error</h1>
            <p>Unable to create member.</p>
            <pre>${error.message}</pre>
        `);
    }
}


async function updateMember(req, res, params) {

    try {

        const data = await parseBody(req);

        const id = Number(params.id);

        const isResident = data.is_resident === 'true';

        await memberService.updateMember(
            id,
            data.first_name,
            data.last_name,
            data.birth_date,
            data.address,
            isResident,
            data.medical_status,
            data.family_id
        );

        res.writeHead(302, {
            Location: `/members/${id}`
        });

        res.end();

    } catch (error) {

        console.error(error);

        res.writeHead(500, {
            'Content-Type': 'text/html'
        });

        res.end(`
            <h1>500 - Server Error</h1>
            <p>Unable to update member.</p>
            <pre>${error.message}</pre>
        `);
    }
}


async function deleteMember(req, res, params) {

    try {

        const id = Number(params.id);

        const member = await memberService.deleteMember(id);

        if (!member) {

            res.writeHead(404, {
                'Content-Type': 'text/html'
            });

            return res.end(`
                <h1>404 - Not Found</h1>
                <p>Member not found.</p>
                <a href="/members">Back to members</a>
            `);
        }

        res.writeHead(302, {
            Location: '/members'
        });

        res.end();

    } catch (error) {

        console.error(error);

        res.writeHead(500, {
            'Content-Type': 'text/html'
        });

        res.end(`
            <h1>500 - Server Error</h1>
            <p>Unable to delete member.</p>
            <pre>${error.message}</pre>
        `);
    }
}


module.exports = {
    getAllMember,
    getMemberById,
    createMember,
    updateMember,
    deleteMember
};