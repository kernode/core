import { AppEventEmitter } from './EventProvider'

interface Listener {
  eventName: string
  action: Function
}

class EventListener {
  private listeners: Array<Listener> = []

  /**
   * save events on listeners
   * @param eventName
   * @param action
   */
  public on(eventName: string, action: Function) {
    this.listeners.push({ eventName, action })
  }

  /**
   * run listener
   */
  public run() {
    for (const l of this.listeners) {
      AppEventEmitter.on(l.eventName, (...args) => {
        if (args[0]) {
          l.action(args[0])
        } else {
          l.action()
        }
      })
    }
  }
}

export default new EventListener()
