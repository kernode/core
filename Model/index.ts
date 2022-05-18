import { Database } from '../Database'

class Model {
  tableName: string

  public query() {
    return Database<this, this[]>(this.tableName)
  }
}

export default Model
