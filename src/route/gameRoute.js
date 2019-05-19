import { gameHandler } from '../handler/gameHandler'

export const gameRoute = server => {
  server.route({
    method: 'GET',
    path: '/games',
    handler: gameHandler.get,
  })
  server.route({
    method: 'POST',
    path: '/games',
    handler: gameHandler.add,
  })
}
