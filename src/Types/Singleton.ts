class Singleton {
  static instance: any

  constructor() {}

  static register() {
    if (!this.instance) {
      this.instance = new this()
    }
    return this.instance
  }
}

export default Singleton
