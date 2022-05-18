import Config from '../Config'
import AwsS3Disk from './AwsS3Disk'
import LocalDisk from './LocalDisk'
import { DiskInterface } from './StorageInterfaces'

class Storage {
  init(): DiskInterface {
    let disk = Config.StorageConfig.storage.disk
    return this.disk(disk)
  }

  disk(disk: string): DiskInterface {
    switch (disk) {
      case 'local':
        return LocalDisk
      case 's3':
        return AwsS3Disk
      default:
        return LocalDisk
    }
  }
}

let storage = new Storage()
export default storage.init()
