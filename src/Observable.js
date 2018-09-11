import { toSubscribe } from "./toSubscriber";
import { higherOrderMap } from "./operator/map";

class Observable {
  constructor(subscribe) {
    this.source = null;
    this.operator = null;
    if (subscribe) {
      this._subscribe = subscribe;
    }
  }

  static create(subscribe) {
    return new Observable(subscribe);
  }

  lift(operator) {
    const observable = new Observable();
    observable.source = this;
    observable.operator = operator;
    return observable;
  }

  _subscribe(subscribe) {
    return this.source.subscribe(subscribe);
  }

  subscribe(observerOrNext) {
    const { operator } = this;
    const sink = toSubscribe(observerOrNext);
    if (operator) {
      operator.call(sink, this.source);
    } else {
      this._trySubscribe(sink);
    }
  }

  _trySubscribe(sink) {
    return this._subscribe(sink);
  }
}

Observable.prototype.map = function (project) {
  return higherOrderMap(project)(this);
};

export default Observable;