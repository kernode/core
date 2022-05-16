import 'dotenv/config'
import Http from './src/Http'
import Config from './src/Config'

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

// SocketProvider.register({
//   httpServer: Http.server,
//   routePath: process.cwd() + '/routes/socket',
//   kernel,
// })
