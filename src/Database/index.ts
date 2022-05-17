import { Knex } from 'knex'
import DatabaseProvider from './DatabaseProvider'

let provider = DatabaseProvider.register()
let knex: Knex = provider.getDatabase()

export { DatabaseProvider, knex }
