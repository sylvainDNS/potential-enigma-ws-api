import env from 'common-env'
import dotenv from 'dotenv'

dotenv.config()

export const config = env().getOrElseAll({
  hapi: {
    host: 'localhost',
    port: 4444,
  },
  postgres: {
    host: 'localhost',
    port: 5432,
    db: 'potential_enigma',
    user: 'potential_enigma',
    password: 'P@ssword',
  },
})
