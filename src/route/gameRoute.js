import { gameHandler } from '../handler/gameHandler'

export const gameRoute = (server, socket) => {
  server.route({
    method: 'GET',
    path: '/games',
    handler: gameHandler.get,
  })
  server.route({
    method: 'GET',
    path: '/games/{game_id}',
    handler: gameHandler.getOne,
  })
  server.route({
    method: 'POST',
    path: '/games',
    handler: request => gameHandler.add(request, socket),
  })
  server.route({
    method: 'DELETE',
    path: '/games/{game_id}',
    handler: request => gameHandler.remove(request, socket),
  })
  server.route({
    method: 'PUT',
    path: '/games/{game_id}',
    handler: request => gameHandler.update(request, socket),
  })
}
