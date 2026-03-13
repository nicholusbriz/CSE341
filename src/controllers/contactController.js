async function getAllContacts(req, res) {
  try {
    const db = req.app.locals.db;
    const contacts = await db.collection('contacts').find({}).toArray();

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

async function getContactById(req, res) {
  try {
    const { id } = req.params;
    const db = req.app.locals.db;

    // Convert string ID to ObjectId
    const { ObjectId } = require('mongodb');
    const contact = await db.collection('contacts').findOne({ _id: new ObjectId(id) });

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

async function createContact(req, res) {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required: firstName, lastName, email, favoriteColor, birthday'
      });
    }

    const db = req.app.locals.db;
    const newContact = {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday,
      createdAt: new Date()
    };

    const result = await db.collection('contacts').insertOne(newContact);

    res.status(201).json({
      success: true,
      data: {
        id: result.insertedId,
        ...newContact
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

async function updateContact(req, res) {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    const db = req.app.locals.db;
    const { ObjectId } = require('mongodb');

    // Check if contact exists
    const existingContact = await db.collection('contacts').findOne({ _id: new ObjectId(id) });
    if (!existingContact) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found'
      });
    }

    // Build update object with only provided fields
    const updateFields = {};
    if (firstName !== undefined) updateFields.firstName = firstName;
    if (lastName !== undefined) updateFields.lastName = lastName;
    if (email !== undefined) updateFields.email = email;
    if (favoriteColor !== undefined) updateFields.favoriteColor = favoriteColor;
    if (birthday !== undefined) updateFields.birthday = birthday;
    updateFields.updatedAt = new Date();

    const result = await db.collection('contacts').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    );

    res.status(200).json({
      success: true,
      data: {
        id: id,
        ...updateFields
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

async function deleteContact(req, res) {
  try {
    const { id } = req.params;
    const db = req.app.locals.db;
    const { ObjectId } = require('mongodb');

    // Check if contact exists
    const existingContact = await db.collection('contacts').findOne({ _id: new ObjectId(id) });
    if (!existingContact) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found'
      });
    }

    const result = await db.collection('contacts').deleteOne({ _id: new ObjectId(id) });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};
