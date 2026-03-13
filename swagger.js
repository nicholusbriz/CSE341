const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API for managing contacts in a MongoDB database',
  },
  host: 'cse341-ncxu.onrender.com',
  schemes: ['https'],
  definitions: {
    Contact: {
      type: 'object',
      required: ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'],
      properties: {
        firstName: {
          type: 'string',
          description: 'First name of the contact'
        },
        lastName: {
          type: 'string',
          description: 'Last name of the contact'
        },
        email: {
          type: 'string',
          format: 'email',
          description: 'Email address of the contact'
        },
        favoriteColor: {
          type: 'string',
          description: 'Favorite color of the contact'
        },
        birthday: {
          type: 'string',
          format: 'date',
          description: 'Birthday of the contact (YYYY-MM-DD format)'
        },
        createdAt: {
          type: 'string',
          format: 'date-time',
          description: 'Date when the contact was created'
        },
        updatedAt: {
          type: 'string',
          format: 'date-time',
          description: 'Date when the contact was last updated'
        }
      }
    },
    ContactResponse: {
      type: 'object',
      properties: {
        success: {
          type: 'boolean'
        },
        data: {
          $ref: '#/definitions/Contact'
        }
      }
    },
    ContactsResponse: {
      type: 'object',
      properties: {
        success: {
          type: 'boolean'
        },
        count: {
          type: 'number'
        },
        data: {
          type: 'array',
          items: {
            $ref: '#/definitions/Contact'
          }
        }
      }
    },
    ErrorResponse: {
      type: 'object',
      properties: {
        success: {
          type: 'boolean',
          example: false
        },
        error: {
          type: 'string'
        }
      }
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation generated successfully!');
});
