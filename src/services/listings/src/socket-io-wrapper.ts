import socket from 'socket.io';

class SocketIOWrapper {
  private _io?: any;

  get io() {
    if (!this._io) {
      throw new Error('Cannot access SocketIO client before connecting');
    }

    return this._io;
  }

  listen(server: any): any {
    this._io = socket.listen(server);
  }
}

export const socketIOWrapper = new SocketIOWrapper();
