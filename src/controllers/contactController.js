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

module.exports = {
  getAllContacts,
  getContactById
};
