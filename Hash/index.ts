import bcrypt from 'bcrypt'
import Config from '../Config'

class Hash {
  public make(password: string) {
    return bcrypt.hashSync(password, Config.HashConfig.rounds)
  }

  public verify(password: string, hashString: string) {
    hashString = hashString.replace('$2y$', '$2a$')
    return bcrypt.compareSync(password, hashString)
  }
}

export default new Hash()
