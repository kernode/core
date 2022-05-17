import { NextFunction, Request, Response } from 'express'
import { Socket } from 'socket.io'

interface SocketMiddleware {
  register(socket: Socket, next: Function): any
}

interface Middleware {
  register(req: Request, res: Response, next: NextFunction): any
}

interface Kernel {
  global: Middleware[]
  web: Middleware[]
  api: Middleware[]
  socket: SocketMiddleware[]
}

export {
  Middleware,
  SocketMiddleware,
  Kernel,
  Request,
  Response,
  NextFunction,
  Socket,
}
