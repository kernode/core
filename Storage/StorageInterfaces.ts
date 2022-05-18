import { Response } from 'express'
import { UploadedFile } from 'express-fileupload'

interface DiskInterface {
  path(path: any): this

  store(file: UploadedFile): Promise<string>

  delete(fileName: any): void

  getStream(fileName: any, res: Response): void
}

interface Stream {
  ContentType: any
  FileName: String
  Body: Buffer | null | string
  ContentLength: any
}

interface S3AdapterConfig {
  id: string
  secret: string
  folder: any
  region: string
  bucket: string
}

export { DiskInterface, Stream, S3AdapterConfig }
