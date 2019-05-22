import { Server } from '@hapi/hapi'
import Io from 'socket.io'
import { config } from './utils/config'
import { gameRoute } from './route/gameRoute'
import { spreadSocket } from './socket/spreadSocket'

export default function start() {
  const server = new Server({
    host: config.hapi.host,
    port: config.hapi.port,
    routes: { cors: { origin: ['*'] } },
  })

  server.start().then(
    () => console.log('Server listening on', server.info.uri),
    err => {
      console.error(err)
    }
  )

  const socket = Io(server.listener)

  spreadSocket(socket)

  gameRoute(server)

  return server
}
