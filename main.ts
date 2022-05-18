import { AppEventEmitter } from './Event'
import 'dotenv/config'
import { SocketProvider } from './Socket'
import Config from './Config'
import Http from './HttpServer'
import Model from './Model'
import { EventProvider } from './Event'

const kernel = {
  global: [],
  api: [],
  web: [],
  socket: [],
}

Http.register({
  apiRoutePath: process.cwd() + '/routes/api',
  webRoutePath: process.cwd() + '/routes/web',
  kernel,
  port: Config.AppConfig.serverPort,
})

SocketProvider.register({
  httpServer: Http.server,
  routePath: process.cwd() + '/routes/socket',
  kernel,
})

EventProvider.register({
  routePath: process.cwd() + '/routes/event',
})

setTimeout(() => {
  AppEventEmitter.emit('message', { name: 'AJ' })
}, 2000)

class User extends Model {
  tableName: string = 'users'
  id: string
}

async function getUsers() {
  let res = await new User().query().first()
  console.log(res?.id)
}

getUsers()
