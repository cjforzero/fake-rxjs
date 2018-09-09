import { Subscriber } from "./Subscriber";

export function toSubscribe(nextOrObserver) {
  return new Subscriber(nextOrObserver);
}