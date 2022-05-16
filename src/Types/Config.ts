interface AppConfig {
  socketEnable: boolean
  serverPort: number
  rateLimit: number
}

interface DatabaseConfig {
  database: {
    driver: string
    mysql: {
      host: string
      port: number
      user: string
      password: string
      database: string
    }
  }
}

interface HashConfig {
  rounds: number
}

interface JwtConfig {
  secret: string
  ttl: number
}

interface StorageConfig {
  /** Storage */
  storage: {
    disk: string
    adapters: {
      local: {
        folder: string
      }
      s3: {
        id: string
        secret: string
        region: string
        folder: string
        bucket: string
      }
    }
  }
}

export { AppConfig, DatabaseConfig, HashConfig, JwtConfig, StorageConfig }
