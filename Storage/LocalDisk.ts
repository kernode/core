import { DiskInterface, Stream } from './StorageInterfaces'
import { UploadedFile } from 'express-fileupload'
import { v4 as uuid } from 'uuid'
import fs from 'fs'
import mime from 'mime-types'
import { Response } from 'express'
import PATH from 'path'
import Config from '../Config'
import { removeSlash, storagePath } from '../Helper'

class LocalDisk implements DiskInterface {
  STORAGE: string

  pathName: string

  constructor() {
    this.STORAGE =
      Config.StorageConfig.storage.adapters.local.folder || storagePath()
  }

  path(path: any): this {
    this.pathName = removeSlash(path)
    return this
  }

  store(file: UploadedFile): Promise<string> {
    let extension = PATH.extname(file.name)
    let fullFileName = uuid() + extension
    if (this.pathName) {
      fullFileName = this.pathName + '/' + fullFileName
    }
    let path = this.STORAGE + fullFileName

    return new Promise((resolve, reject) => {
      file.mv(path, (error) => {
        if (error) {
          reject(error)
        } else {
          resolve(fullFileName)
        }
      })
    })
  }

  delete(fileName: any): void {
    let path = this.STORAGE + removeSlash(fileName)
    fs.unlink(path, () => {})
  }

  getStream(fileName: any, res: Response): void {
    let path = this.STORAGE + removeSlash(fileName)
    let ContentType = mime.lookup(path)
    var stats = fs.statSync(path)
    let stream = fs.createReadStream(path)

    res.header('content-type', ContentType as string)
    res.header('content-length', stats.size as any)
    stream.pipe(res)
  }
}

export default new LocalDisk()
