
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
    );
});

const homecontroller = require('../controllers/homeController');
const facilityController = require('../controllers/facilityController');
const clubController = require('../controllers/clubController');
const activityController = require('../controllers/activityController');
const memberController =require('../controllers/memberController');

router.on('GET', '/', homecontroller.home);
router.on('GET', '/facilities', facilityController.getFacilities)
router.on('POST', '/facilities/:id/delete', facilityController.deleteFacility)
router.on('POST', '/facilities', facilityController.createFacility);
router.on('GET', '/facilities/:id', facilityController.getFacilityById);
router.on('POST', '/facilities/:id/update', facilityController.updateFacility);


router.on('GET', '/clubs', clubController.getAllClubs);
router.on('POST', '/clubs/:id/delete', clubController.deleteClub);
router.on('POST', '/clubs', clubController.createClub);
router.on('POST', '/clubs/:id/update', clubController.updateClub);
router.on('GET', '/clubs/:id', clubController.getClubById);


router.on('GET', '/activities', activityController.getAllActivities);
router.on('POST', '/activities', activityController.createActivity);
router.on('GET', '/activities/:id', activityController.getActivityById);
router.on('POST', '/activities/:id/delete', activityController.deleteActivity);
router.on('POST', '/activities/:id/update', activityController.updateActivity);

router.on("GET" ,"/members",memberController.getAllMember)

module.exports = router;