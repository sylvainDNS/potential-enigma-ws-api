import { Pool } from 'pg'
import { config } from './config'

const initDb = () =>
  new Pool({
    host: config.postgres.host,
    port: config.postgres.port,
    database: config.postgres.db,
    user: config.postgres.user,
    password: config.postgres.password,
  })

export const database = initDb()

export const executeSql = (db, query, values) =>
  db.query(query, values).then(res => res.rows)
