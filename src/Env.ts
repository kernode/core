class Env {
  static get(key: any, defaultValue: any = '') {
    return process.env[key] || defaultValue
  }
}
export default Env
