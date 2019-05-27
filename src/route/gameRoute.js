import { gameHandler } from '../handler/gameHandler'
import Joi from '@hapi/joi'

const gameIdSchema = Joi.string()
  .guid()
  .required()

export const gameRoute = (server, socket) => {
  server.route({
    method: 'GET',
    path: '/games',
    handler: gameHandler.get,
    config: {
      description: 'Get games',
      notes: 'Returns all games stored in database',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: {
            '400': {
              description: 'Bad Request',
            },
          },
          payloadType: 'json',
        },
      },
    },
  })
  server.route({
    method: 'GET',
    path: '/games/{game_id}',
    handler: gameHandler.getOne,
    config: {
      description: 'Get game',
      notes: 'Returns a game identified by {game_id} stored in database',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: {
            '400': {
              description: 'Bad Request',
            },
          },
          payloadType: 'json',
        },
      },
      validate: {
        params: {
          game_id: gameIdSchema,
        },
      },
    },
  })
  server.route({
    method: 'POST',
    path: '/games',
    handler: request => gameHandler.add(request, socket),
    config: {
      description: 'Add game',
      notes: 'Add a game in database and return it',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: {
            '400': {
              description: 'Bad Request',
            },
          },
          payloadType: 'json',
        },
      },
    },
  })
  server.route({
    method: 'DELETE',
    path: '/games/{game_id}',
    handler: request => gameHandler.remove(request, socket),
    config: {
      description: 'Delete game',
      notes: 'Delete a game in database and return it',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: {
            '400': {
              description: 'Bad Request',
            },
            '404': {
              description: 'Not Found',
            },
          },
          payloadType: 'json',
        },
      },
      validate: {
        params: {
          game_id: gameIdSchema,
        },
      },
    },
  })
  server.route({
    method: 'PUT',
    path: '/games/{game_id}',
    handler: request => gameHandler.update(request, socket),
    config: {
      description: 'Update game',
      notes: 'Update a game in database and return it',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: {
            '400': {
              description: 'Bad Request',
            },
            '404': {
              description: 'Not Found',
            },
          },
          payloadType: 'json',
        },
      },
      validate: {
        params: {
          game_id: gameIdSchema,
        },
      },
    },
  })
}
