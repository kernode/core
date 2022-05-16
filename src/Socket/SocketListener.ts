interface SocketListenerInterface {
  eventName: string
  action: Function
}

class SocketListener {
  private listeners: Array<SocketListenerInterface> = []

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
   * @param socket
   */
  public run(socket: any) {
    for (const l of this.listeners) {
      socket.on(l.eventName, (args: any) => {
        let params = { payload: args, socketId: socket.id, socket }
        l.action(params)
      })
    }
  }
}

export default new SocketListener()
