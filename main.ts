import { AppEventEmitter } from './src/Event'
import 'dotenv/config'
import { SocketProvider } from './src/Socket'
import Config from './src/Config'
import Http from './src/Http'
import Model from './src/Model'
import { EventProvider } from './src/Event'

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
