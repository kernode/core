import { createServer, Server as HttpServer } from 'http'
import express from 'express'
import fileUpload from 'express-fileupload'
import { Router, ApiRouter } from './Router'
import { Kernel, Middleware } from '../Types'
import rateLimit from 'express-rate-limit'
import Config from '../Config'
import bodyParser from 'body-parser'

class Http {
  server: HttpServer

  app: any

  kernel: Kernel

  public register({ webRoutePath, apiRoutePath, kernel, port }: { webRoutePath: string; apiRoutePath: string; kernel: Kernel; port: number }) {
    if (!this.server) {
      this.kernel = kernel
      console.log('\x1b[33m%s\x1b[0m', '[✅] Creating http server')

      this.app = express()
      this.handleMultipart().handleParser().handleRateLimiter().registerGlobalMiddleware().registerWebMiddleware(webRoutePath).registerApiMiddleware(apiRoutePath).run(port)
    }
  }

  getApp() {
    return this.app
  }

  use(middleware: any) {
    this.app.use(middleware)
    return this
  }

  run(port: number) {
    this.server = createServer(this.app)
    this.server.listen(port, () => {
      console.log('\x1b[36m%s\x1b[0m', `🚀 [${process.env.NODE_ENV}] Server started on : http://127.0.0.1:${port}`)
    })
  }

  handleParser() {
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: false }))
    return this
  }

  handleRateLimiter() {
    const RateLimiter = rateLimit({
      windowMs: 1 * 60 * 1000,
      max: Config.AppConfig.rateLimit,
      standardHeaders: true,
      legacyHeaders: false,
    })
    this.app.use(RateLimiter)
    return this
  }

  /**for multipart file upload */
  handleMultipart() {
    this.app.use(
      fileUpload({
        createParentPath: true,
      })
    )
    return this
  }

  /** global middleware */
  registerGlobalMiddleware() {
    if (this.kernel.global.length > 0) {
      this.app.use(this.getMiddleware(this.kernel.global))
    }
    return this
  }

  /** web middleware */
  registerWebMiddleware(path: string) {
    require(path)
    this.app.use('', this.getMiddleware(this.kernel.web), Router)
    return this
  }

  /** api middleware */
  registerApiMiddleware(path: string) {
    require(path)
    this.app.use('/api', this.getMiddleware(this.kernel.api), ApiRouter)
    return this
  }

  getMiddleware(list: Array<Middleware>) {
    let ret = []
    for (var i = 0; i < list.length; i++) {
      let m: Middleware = list[i] as Middleware
      ret.push(m.register)
    }
    return ret
  }
}
export default new Http()

export { Router, ApiRouter }
