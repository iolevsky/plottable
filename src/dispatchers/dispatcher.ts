module Plottable {
export class Dispatcher {
  protected _eventToCallback: { [eventName: string]: (e: Event) => any; } = {};
  private _eventNameToCallbackSet: { [eventName: string]: Utils.CallbackSet<Function>; } = {};
  private _connected = false;

  private _hasNoCallbacks() {
    const eventNames = Object.keys(this._eventNameToCallbackSet);
    for (let i = 0; i < eventNames.length; i++) { // for-loop so return can break out
      if (this._eventNameToCallbackSet[eventNames[i]].size !== 0) {
        return false;
      }
    }
    return true;
  }

  private _connect() {
    if (this._connected) {
      return;
    }
    Object.keys(this._eventToCallback).forEach((event: string) => {
      let callback = this._eventToCallback[event];
      document.addEventListener(event, callback);
    });
    this._connected = true;
  }

  private _disconnect() {
    if (this._connected && this._hasNoCallbacks()) {
      Object.keys(this._eventToCallback).forEach((event: string) => {
        let callback = this._eventToCallback[event];
        document.removeEventListener(event, callback);
      });
      this._connected = false;
    }
  }

  protected _addCallbackForEvent(eventName: string, callback: Function) {
    if (this._eventNameToCallbackSet[eventName] == null) {
      this._eventNameToCallbackSet[eventName] = new Utils.CallbackSet<Function>();
    }
    this._eventNameToCallbackSet[eventName].add(callback);
    this._connect();
  }

  protected _removeCallbackForEvent(eventName: string, callback: Function) {
    if (this._eventNameToCallbackSet[eventName] != null) {
      this._eventNameToCallbackSet[eventName].delete(callback);
    }
    this._disconnect();
  }

  protected _callCallbacksForEvent(eventName: string, ...args: any[]) {
    const callbackSet = this._eventNameToCallbackSet[eventName];
    if (callbackSet != null) {
      callbackSet.callCallbacks.apply(callbackSet, args);
    }
  }
}
}
