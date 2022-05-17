import EventEmitter from 'events'
import EventListener from './EventListener'

class EventProvider {
  appEvent: EventEmitter

  public constructor() {
    if (!this.appEvent) {
      this.appEvent = new EventEmitter()
    }
  }

  public register({ routePath }: { routePath: string }) {
    require(routePath)
    EventListener.run()
  }
}

let app = new EventProvider()
let AppEventEmitter: EventEmitter = app.appEvent

export default app
export { AppEventEmitter }
