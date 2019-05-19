import { Server } from '@hapi/hapi'
import { config } from './utils/config'
import { gameRoute } from './route/gameRoute'

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

  gameRoute(server)

  return server
}
