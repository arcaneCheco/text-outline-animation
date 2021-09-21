export default class EventEmitter {
  constructor() {
    this._events = {};
  }

  on(event, fn) {
    if (!this._events[event]) {
      this._events[event] = [];
    }

    this._events[event].push(fn);
  }

  off(event, fn) {
    if (!this._events[event]) {
      throw new Error(
        `Can't remove a listener. Event "${event}" doesn't exits.`
      );
    }

    this._events[event] = this._events[event].filter(
      (listener) => listener !== fn
    );
  }

  emit(name, data) {
    if (!this._events[name]) {
      throw new Error(`Can't emit an event. Event "${name}" doesn't exits.`);
    }

    this._events[name].forEach((fn) => fn(data));
  }
}
