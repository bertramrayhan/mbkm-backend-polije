const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRole } = require('../authMiddleware');

const eventController = require('../controllers/eventControllers');

router.post('/', authenticateToken, authorizeRole(['admin', 'organizer']), eventController.createEvent); //organizer/admin membuat event

router.get('/', eventController.getAllEvents); //public mengambil semua event

router.get('/:id', eventController.getEventById); //public mencari suatu event

router.put('/:id', eventController.updateEvent); //owner organizer/admin mengubah suatu event

router.delete('/:id', eventController.deleteEvent); //owner organizer/admin menghapus suatu event

router.get('/test/db', eventController.testDB); //pengetesan database

module.exports = router;