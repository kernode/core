import jwt, { JwtPayload } from 'jsonwebtoken'
import Config from '../Config'

class Auth {
  token(user: object): string {
    return jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + Config.JwtConfig.ttl,
        iat: Math.floor(Date.now() / 1000) - 30,
        data: user,
      },
      Config.JwtConfig.secret
    )
  }

  verify(token: string): any {
    try {
      let payload: any = jwt.verify(token, Config.JwtConfig.secret)
      return payload.data
    } catch (err) {
      return false
    }
  }
}

export default new Auth()
