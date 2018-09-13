import { Subscriber } from "./Subscriber";

export class OuterSubscriber extends Subscriber {
  notifyNext(outerValue, innerValue) {
    this.destination.next(innerValue);
  }
}