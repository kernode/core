import { DiskInterface, S3AdapterConfig } from './StorageInterfaces'
import { UploadedFile } from 'express-fileupload'
import { v4 as uuid } from 'uuid'
import mime from 'mime-types'
import { Response } from 'express'
import PATH from 'path'

import S3, { PutObjectRequest, GetObjectOutput, DeleteObjectRequest } from 'aws-sdk/clients/s3'
import Config from '../Config'
import { removeSlash } from '../Helper'

class AwsS3Disk implements DiskInterface {
  config: S3AdapterConfig

  client: S3

  per: string

  acl: string = 'public-read'

  pathName: string

  public permission(acl: string) {
    this.acl = acl
    return this
  }

  constructor() {
    this.config = Config.StorageConfig.storage.adapters.s3
    this.client = new S3({
      accessKeyId: this.config.id,
      secretAccessKey: this.config.secret,
      region: this.config.region,
    })
  }

  path(path: any): this {
    this.pathName = removeSlash(path)
    return this
  }

  async store(file: UploadedFile): Promise<string> {
    let extension = PATH.extname(file.name)
    let fileName = uuid() + extension
    if (this.pathName) {
      fileName = this.pathName + '/' + fileName
    }
    let path = this._getPath(fileName)

    let params: PutObjectRequest = {
      Bucket: this.config.bucket,
      Key: path,
      ContentType: mime.lookup(path) as string,
      Body: file.data,
      ACL: this.acl,
    }

    return new Promise((resolve, reject) => {
      this.client.upload(params, (err: any) => {
        if (err) {
          reject(err)
        } else {
          resolve(fileName)
        }
      })
    })
  }

  delete(fileName: any): void {
    let path = this._getPath(fileName)
    let params: DeleteObjectRequest = {
      Bucket: this.config.bucket,
      Key: path,
    }
    this.client.deleteObject(params, () => {})
  }

  getStream(fileName: any, res: Response): void {
    let path = this._getPath(fileName)
    let ContentType = mime.lookup(path)

    let params = {
      Bucket: this.config.bucket,
      Key: path,
    }

    this.client.getObject(params, (err: any, data: GetObjectOutput) => {
      if (err) {
        res.status(500)
        res.send(err)
      } else {
        res.header('content-type', ContentType as string)
        res.header('content-length', data.ContentLength as any)
        res.end(data.Body)
      }
    })
  }

  _getPath(fileName: any) {
    return removeSlash(this.config.folder) + '/' + fileName
  }
}

export default new AwsS3Disk()
