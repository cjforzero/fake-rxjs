import { OuterSubscriber } from "../OuterSubscriber";
import { ArrayObservable } from "../observable/ArrayObservable";
import { subscribeToResult } from "./switchMap";

const none = {};

class CombineLatestSubscriber extends OuterSubscriber {
  constructor(destination) {
    super(destination);
    this.observables = [];
    this.values = [];
  }

  _next(observable) {
    this.values.push(none);
    this.observables.push(observable);
  }

  _complete() {
    const observables = this.observables;
    const len = observables.length;
    if (len === 0) {
      this.destination.complete();
    } else {
      this.toRespond = len;
      for (let i = 0; i < len; i++) {
        const observable = observables[i];
        subscribeToResult(this, observable, observable, i);
      }
    }
  }

  notifyNext(outerValue, innerValue, outerIndex) {
    const values = this.values;
    const oldVal = values[outerIndex];
    const toRespond = !this.toRespond
      ? 0
      : oldVal === none ? --this.toRespond : this.toRespond;
    values[outerIndex] = innerValue;
    if (toRespond === 0) {
      this.destination.next(values);
    }
  }

}

export class CombineLatestOperator {
  call(subscriber, source) {
    return source.subscribe(new CombineLatestSubscriber(subscriber));
  }
}

export function higherOrderCombineLatest(observables) {
  return source => source.lift.call(new ArrayObservable([source, ...observables]), new CombineLatestOperator());
}