import { knex } from '../Database'

class Model {
  tableName: string

  public query() {
    return knex<this, this[]>(this.tableName)
  }
}

export default Model
