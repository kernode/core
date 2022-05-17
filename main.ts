import 'dotenv/config'
import { SocketProvider } from './src/Socket'
import Config from './src/Config'
import Http from './src/Http'

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
