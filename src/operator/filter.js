import { Subscriber } from "../Subscriber";

class FilterSubscribe extends Subscriber {
  constructor(destination, predicate) {
    super(destination);
    this.predicate = predicate;
  }

  _next(value) {
    const result = this.predicate.call(this, value);
    if (result) {
      this.destination.next(value);
    }
  }

}

class FilterOperator {
  constructor(predicate) {
    this.predicate = predicate;
  }

  call(subscribe, source) {
    return source.subscribe(new FilterSubscribe(subscribe, this.predicate));
  }

}

export function higherOrderFilter(predicate) {
  return (source) => {
    return source.lift(new FilterOperator(predicate));
  }
}