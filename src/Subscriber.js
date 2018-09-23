export class SafeSubscribe {
  constructor(subscriber, observerOrNext) {
    let next;
    let context = this;
    if (typeof observerOrNext === 'function') {
      next = observerOrNext
    } else if (observerOrNext) {
      next = observerOrNext.next;
      context = Object.create(observerOrNext)
    }
    this.context = context;
    this._next = next;
  }

  next(value) {
    this._next.call(this.context, value);
  }
}

export class Subscriber {

  constructor(destinationOrNext) {
    this.destination = new SafeSubscribe(this, destinationOrNext);
  }

  next(value) {
    this._next.call(this, value);
  }

  _next(value) {
    this.destination.next(value);
  }

  complete() {
    this._complete();
  }

  _complete() {
    this.destination.complete();
  }
}