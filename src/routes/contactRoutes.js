const express = require('express');
const router = express.Router();
const { getAllContacts, getContactById } = require('../controllers/contactController');

// GET /api/contacts - Get all contacts
router.get('/', getAllContacts);

// GET /api/contacts/:id - Get contact by ID
router.get('/:id', getContactById);

module.exports = router;
