const express = require('express');
const router = express.Router();
const { getAllContacts, getContactById, createContact, updateContact, deleteContact } = require('../controllers/contactController');

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all contacts
 *     description: Retrieve a list of all contacts from the database
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: Successfully retrieved all contacts
 *         schema:
 *           $ref: '#/definitions/ContactsResponse'
 *       500:
 *         description: Server error
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
// GET /api/contacts - Get all contacts
router.get('/', getAllContacts);

/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     summary: Get a contact by ID
 *     description: Retrieve a specific contact by their ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Contact ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved contact
 *         schema:
 *           $ref: '#/definitions/ContactResponse'
 *       404:
 *         description: Contact not found
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       500:
 *         description: Server error
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
// GET /api/contacts/:id - Get contact by ID
router.get('/:id', getContactById);

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Create a new contact
 *     description: Add a new contact to the database
 *     tags: [Contacts]
 *     parameters:
 *       - in: body
 *         name: contact
 *         required: true
 *         description: Contact object
 *         schema:
 *           $ref: '#/definitions/Contact'
 *     responses:
 *       201:
 *         description: Contact created successfully
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             data:
 *               $ref: '#/definitions/Contact'
 *       400:
 *         description: Bad request - missing required fields
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       500:
 *         description: Server error
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
// POST /api/contacts - Create a new contact
router.post('/', createContact);

/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update a contact
 *     description: Update an existing contact's information
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Contact ID
 *         schema:
 *           type: string
 *       - in: body
 *         name: contact
 *         required: true
 *         description: Updated contact object
 *         schema:
 *           $ref: '#/definitions/Contact'
 *     responses:
 *       200:
 *         description: Contact updated successfully
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             data:
 *               $ref: '#/definitions/Contact'
 *       404:
 *         description: Contact not found
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       500:
 *         description: Server error
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
// PUT /api/contacts/:id - Update a contact
router.put('/:id', updateContact);

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact
 *     description: Remove a contact from the database
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Contact ID
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Contact deleted successfully
 *       404:
 *         description: Contact not found
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 *       500:
 *         description: Server error
 *         schema:
 *           $ref: '#/definitions/ErrorResponse'
 */
// DELETE /api/contacts/:id - Delete a contact
router.delete('/:id', deleteContact);

module.exports = router;
