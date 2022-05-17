import Singleton from './Singleton'
import {
  AppConfig,
  DatabaseConfig,
  HashConfig,
  JwtConfig,
  StorageConfig,
} from './Types/Config'

class ConfigClass extends Singleton {
  AppConfig: AppConfig
  DatabaseConfig: DatabaseConfig
  HashConfig: HashConfig
  StorageConfig: StorageConfig
  JwtConfig: JwtConfig

  constructor() {
    super()
    this.getConfig()
  }

  private getConfig() {
    this.AppConfig = require(process.cwd() + '/config/app').default
    this.DatabaseConfig = require(process.cwd() + '/config/database').default
    this.HashConfig = require(process.cwd() + '/config/hash').default
    this.StorageConfig = require(process.cwd() + '/config/storage').default
    this.JwtConfig = require(process.cwd() + '/config/jwt').default
  }
}

let Config: ConfigClass = ConfigClass.register()
export default Config
