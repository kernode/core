import { Knex } from 'knex'
import DatabaseProvider from './DatabaseProvider'

let provider = DatabaseProvider.register()
let Database: Knex = provider.getDatabase()

export { DatabaseProvider, Database }
