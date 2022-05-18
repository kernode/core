import { Response } from 'express'

export default class View {
  res: Response
  constructor(res: Response) {
    this.res = res
  }

  public render(path: String) {
    this.res.sendFile(process.cwd() + `/views/${path}`)
  }
}
