import { database, executeSql } from '../utils/database'
import { badRequest, notFound } from '@hapi/boom'
import { emitGameId } from '../socket'

export const gameHandler = {
  get: () => {
    const reply = executeSql(
      database,
      'SELECT game_id, name, "createdAt", "completedAt" FROM GAME WHERE "deletedAt" IS NULL',
      []
    ).catch(err => badRequest(err))

    return reply
  },
  getOne: request => {
    const { game_id } = request.params

    const reply = executeSql(
      database,
      'SELECT game_id, name, "createdAt", "completedAt" FROM GAME WHERE "deletedAt" IS NULL AND game_id = $1::uuid',
      [game_id]
    ).catch(err => badRequest(err))

    return reply
  },
  add: (request, socket) => {
    const { name } = request.payload

    const reply = executeSql(
      database,
      'INSERT INTO game( name ) VALUES( $1::text ) RETURNING game_id, name, "createdAt", "completedAt";',
      [name]
    )
      .then(res => res[0])
      .then(game => emitGameId(socket, 'add', game))
      .catch(err => badRequest(err))

    return reply
  },
  remove: (request, socket) => {
    const { game_id } = request.params

    const reply = executeSql(
      database,
      'UPDATE game SET "deletedAt" = now() WHERE game_id = $1::uuid AND "deletedAt" IS NULL RETURNING game_id, name, "createdAt", "completedAt";',
      [game_id]
    )
      .then(res => {
        if (res.length) return res[0]
        else return notFound('game_id ' + game_id + ' does not exists')
      })
      .then(game => emitGameId(socket, 'delete', game))
      .catch(err => badRequest(err))

    return reply
  },
  update: (request, socket) => {
    const { game_id } = request.params,
      { isCompleted } = request.payload

    if (typeof isCompleted !== 'boolean') return badRequest('Unknown parameter')
    else
      return executeSql(
        database,
        'UPDATE game SET "completedAt" = $1 WHERE game_id = $2::uuid AND "deletedAt" IS NULL RETURNING game_id, name, "createdAt", "completedAt";',
        [(() => (isCompleted ? 'now()' : null))(), game_id]
      )
        .then(res => {
          if (res.length) return res[0]
          else return notFound('game_id ' + game_id + ' does not exists')
        })
        .then(game => emitGameId(socket, 'complete', game))
        .catch(err => badRequest(err))
  },
}
