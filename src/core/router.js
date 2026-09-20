const fs = require('fs');
const ejs = require('ejs');
const path = require('path');
const FindMyWay = require('find-my-way');

const router = FindMyWay();
router.on('GET', '/css/style.css', (req, res) => {

    fs.readFile(
        path.join(__dirname, '../../public/css/style.css'),
        (err, data) => {

            if (err) {
                res.writeHead(404);
                res.end('File not found');
                return;
            }

            res.writeHead(200, {
                'Content-Type': 'text/css'
            });

            res.end(data);
        }
    );});

const homecontroller = require('../controllers/homeController');
const facilityController = require('../controllers/facilityController');

    router.on('GET', '/', homecontroller.home);
    router.on('GET','/facilities',facilityController.getFacilities)



module.exports = router;