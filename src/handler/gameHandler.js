import { database, executeSql } from '../utils/database'
import { badRequest, notFound } from '@hapi/boom'

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
  add: request => {
    const { name } = request.payload

    const reply = executeSql(
      database,
      'INSERT INTO game( name ) VALUES( $1::text ) RETURNING game_id, name, "createdAt", "completedAt";',
      [name]
    )
      .then(res => res[0])
      .catch(err => badRequest(err))

    return reply
  },
  remove: request => {
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
      .catch(err => badRequest(err))

    return reply
  },
}
