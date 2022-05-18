import { Server as SocketServer } from 'socket.io'
import { Server as HttpServer } from 'http'
import { Kernel, SocketMiddleware } from '../Types'
import SocketListener from './SocketListener'

class SocketProvider {
  private kernel: Kernel

  io: SocketServer

  public register({
    httpServer,
    routePath,
    kernel,
  }: {
    httpServer: HttpServer
    routePath: string
    kernel: Kernel
  }) {
    if (!this.io) {
      this.kernel = kernel
      require(routePath)
      console.log('\x1b[33m%s\x1b[0m', '[✅] Creating socket server')
      this.io = new SocketServer(httpServer, {
        allowEIO3: true,
        cors: {
          origin: '*',
        },
      })

      let middleware = kernel.socket

      middleware.forEach((m: SocketMiddleware) => {
        this.io.use(m.register)
      })

      this.io.on('connection', (socket) => {
        SocketListener.run(socket)
      })
    }
    return this.io
  }
}

export default new SocketProvider()
