class Env {
  public get(key: any, defaultValue: any = '') {
    return process.env[key] || defaultValue
  }
}
export default new Env()
