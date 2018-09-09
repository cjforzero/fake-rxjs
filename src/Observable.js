import { toSubscribe } from "./toSubscriber";

export class Observable {
  constructor(subscribe) {
    if (subscribe) {
      this._subscribe = subscribe;
    }
  }

  static create(subscribe) {
    return new Observable(subscribe);
  }

  subscribe(observerOrNext) {
    const sink = toSubscribe(observerOrNext);
    this._trySubscribe(sink)
  }

  _trySubscribe(sink) {
    return this._subscribe(sink);
  }
}