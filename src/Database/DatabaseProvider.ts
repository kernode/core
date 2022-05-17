import knex, { Knex } from 'knex'
import Config from '../Config'
import Singleton from '../Singleton'

class DatabaseProvider extends Singleton {
  private knex: Knex

  constructor() {
    super()
    console.log('\x1b[33m%s\x1b[0m', '[✅] Connecting with database')
    this.knex = this.getKnex()
  }

  getDatabase(): Knex {
    return this.knex
  }

  private getKnex(): Knex {
    switch (Config.DatabaseConfig.database.driver) {
      case 'mysql':
        return this.getMysql()
      default:
        return this.getMysql()
    }
  }

  private getMysql(): Knex {
    let mysql = Config.DatabaseConfig.database.mysql
    return knex({
      client: 'mysql2',
      connection: mysql,
    })
  }
}

export default DatabaseProvider
