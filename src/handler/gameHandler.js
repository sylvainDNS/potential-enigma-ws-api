import { database, executeSql } from '../utils/database'
import { badRequest } from '@hapi/boom'

export const gameHandler = {
  get: () => {
    const reply = executeSql(
      database,
      'SELECT game_id, name, "createdAt", "completedAt" FROM GAME WHERE "deletedAt" IS NULL',
      []
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
}
