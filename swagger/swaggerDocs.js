// Swagger API Samples
// https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schema-object

const rolePaths = {
    '/roles': {
      get: {
        summary: 'Retrieve a list of all roles',
        tags: ['Roles'],
        security: [
            { 
                Auth0: [] 
            }
        ],
        responses: {
          200: {
            description: 'A list of roles retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Role' },
                },
              },
            },
          },
          500: { description: 'Internal Server Error' },
        },
      },
    },
  };
  
  const permissionPaths = {
    '/permissions': {
      get: {
        summary: 'Retrieve a list of all permissions',
        tags: ['Permissions'],
        security: [
            { 
                Auth0: [] 
            }
        ],
        responses: {
          200: {
            description: 'A list of permissions retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Permission' },
                },
              },
            },
          },
          500: { description: 'Internal Server Error' },
        },
      },
    },
  };
  
  const userPaths = {
    '/users': {
      get: {
        summary: 'Retrieve a list of all users',
        tags: ['Users'],
        security: [
          {
            Auth0: [],
          },
        ],
        responses: {
          200: {
            description: 'A list of users retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      sub: { type: 'string' },
                      role_id: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
          500: { description: 'Internal Server Error' },
        },
      },
    },
  };
  
  const eventPaths = {
      '/events': {
        post: {
          summary: 'Create a new event',
          tags: ['Events'],
          security: [
            {
              Auth0: [],
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    description: { type: 'string' },
                    date_start: { type: 'string', format: 'date-time' },
                    date_end: { type: 'string', format: 'date-time' },
                    location: { type: 'string' },
                    capacity: { type: 'integer' },
                    reminder: { type: 'integer' },
                    max_additional_guests: { type: 'integer', default: 0 },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: 'Event created successfully' },
            400: { description: 'Bad Request' },
            500: { description: 'Internal Server Error' },
          },
        },
        get: {
          summary: 'Retrieve a list of events',
          tags: ['Events'],
          security: [
            {
              Auth0: [],
            },
          ],
          responses: {
            200: {
              description: 'A list of events',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Event' },
                  },
                },
              },
            },
            500: { description: 'Internal Server Error' },
          },
        },
      },
      '/events/{id}': {
        get: {
          summary: 'Retrieve a single event by ID',
          tags: ['Events'],
          security: [
            {
              Auth0: [],
            },
          ],
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: { type: 'integer' },
              description: 'The ID of the event to retrieve',
            },
          ],
          responses: {
            200: { description: 'Event details retrieved successfully' },
            404: { description: 'Event not found' },
            500: { description: 'Internal Server Error' },
          },
        },
        put: {
          summary: 'Update an existing event by ID',
          tags: ['Events'],
          security: [
            {
              Auth0: [],
            },
          ],
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: { type: 'integer' },
              description: 'The ID of the event to update',
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    description: { type: 'string' },
                    date_start: { type: 'string', format: 'date-time' },
                    date_end: { type: 'string', format: 'date-time' },
                    location: { type: 'string' },
                    capacity: { type: 'integer' },
                    reminder: { type: 'integer' },
                    max_additional_guests: { type: 'integer', default: 0 },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Event updated successfully' },
            400: { description: 'Bad Request' },
            404: { description: 'Event not found' },
            500: { description: 'Internal Server Error' },
          },
        },
        delete: {
          summary: 'Delete an event by ID',
          tags: ['Events'],
          security: [
            {
              Auth0: [],
            },
          ],
          parameters: [
            {
              in: 'path',
              name: 'id',
              required: true,
              schema: { type: 'integer' },
              description: 'The ID of the event to delete',
            },
          ],
          responses: {
            200: { description: 'Event deleted successfully' },
            404: { description: 'Event not found' },
            500: { description: 'Internal Server Error' },
          },
        },
      },
    };

    const invitePaths = {
      '/invites/{inviteID}': {
          get: {
              summary: 'Retrieve event details for an invite',
              tags: ['Invites'],
              parameters: [
                  {
                      name: 'inviteID',
                      in: 'path',
                      required: true,
                      description: 'The unique invite identifier',
                      schema: { type: 'string' },
                  },
              ],
              responses: {
                  200: {
                      description: 'Event details retrieved successfully',
                      content: {
                          'application/json': {
                              schema: {
                                  type: 'object',
                                  properties: {
                                      check: { type: 'string', enum: ['used', 'unused'] },
                                      event: { $ref: '#/components/schemas/Event' },
                                      message: { type: 'string' },
                                  },
                              },
                          },
                      },
                  },
                  400: { description: 'Invalid inviteID' },
                  404: { description: 'No Invitation Found' },
                  500: { description: 'Internal server error' },
              },
          },
          post: {
              summary: 'Participate in an event',
              tags: ['Invites'],
              parameters: [
                  {
                      name: 'inviteID',
                      in: 'path',
                      required: true,
                      description: 'The unique invite identifier',
                      schema: { type: 'string' },
                  },
              ],
              requestBody: {
                  required: true,
                  content: {
                      'application/json': {
                          schema: {
                              type: 'object',
                              properties: {
                                  action: { type: 'string', enum: ['confirm', 'decline'] },
                                  email: { type: 'string', format: 'email' },
                              },
                              required: ['action', 'email'],
                          },
                      },
                  },
              },
              responses: {
                  200: { description: 'Action completed successfully' },
                  400: { description: 'Invalid Request' },
                  500: { description: 'Internal server error' },
              },
          },
      },
      '/invites/{inviteID}/events': {
          get: {
              summary: 'List all guest events for an invite',
              tags: ['Invites'],
              parameters: [
                  {
                      name: 'inviteID',
                      in: 'path',
                      required: true,
                      description: 'The unique invite identifier',
                      schema: { type: 'string' },
                  },
              ],
              requestBody: {
                  required: true,
                  content: {
                      'application/json': {
                          schema: {
                              type: 'object',
                              properties: {
                                  email: { type: 'string', format: 'email' },
                              },
                              required: ['email'],
                          },
                      },
                  },
              },
              responses: {
                  200: {
                      description: 'List of events retrieved successfully',
                      content: {
                          'application/json': {
                              schema: {
                                  type: 'array',
                                  items: { $ref: '#/components/schemas/Event' },
                              },
                          },
                      },
                  },
                  400: { description: 'Invalid Request: Email not valid for this ID' },
                  500: { description: 'Internal server error' },
              },
          },
      },
  };
  
    
    module.exports = {
      paths: {
        ...eventPaths,
        ...userPaths,
        ...invitePaths,
        ...rolePaths,
        ...permissionPaths,
      },
    };