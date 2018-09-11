import { Subscriber } from "./Subscriber";

export function toSubscribe(nextOrObserver) {
  if (nextOrObserver) {
    if (nextOrObserver instanceof Subscriber) {
      return nextOrObserver;
    }
  }
  return new Subscriber(nextOrObserver);
}