require('dotenv').config();
const { connectToDatabase } = require('./db');

async function setupContacts() {
  try {
    const db = await connectToDatabase();
    const contactsCollection = db.collection('contacts');
    
    // Clear existing contacts (optional)
    await contactsCollection.deleteMany({});
    console.log('Cleared existing contacts');
    
    // Insert sample contacts
    const contacts = [
      {
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@example.com',
        favoriteColor: 'blue',
        birthday: new Date('1995-06-15')
      },
      {
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.j@example.com',
        favoriteColor: 'green',
        birthday: new Date('1998-03-22')
      },
      {
        firstName: 'Michael',
        lastName: 'Brown',
        email: 'michael.b@example.com',
        favoriteColor: 'red',
        birthday: new Date('1997-11-08')
      }
    ];
    
    const result = await contactsCollection.insertMany(contacts);
    console.log(`Successfully inserted ${result.insertedCount} contacts`);
    
    // Verify insertion
    const count = await contactsCollection.countDocuments();
    console.log(`Total contacts in collection: ${count}`);
    
    // Display inserted contacts
    const allContacts = await contactsCollection.find({}).toArray();
    console.log('Inserted contacts:');
    allContacts.forEach((contact, index) => {
      console.log(`${index + 1}. ${contact.firstName} ${contact.lastName} - ${contact.email}`);
    });
    
  } catch (error) {
    console.error('Error setting up contacts:', error);
  } finally {
    process.exit(0);
  }
}

setupContacts();
