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
}
