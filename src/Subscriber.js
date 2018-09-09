class SafeSubscribe {
  constructor(subscriber, observerOrNext) {
    let next;
    if (typeof observerOrNext === 'function') {
      next = observerOrNext
    } else if (observerOrNext) {
      next = observerOrNext.next;
    }
    this._next = next;
  }

  next(value) {
    this._next.call(this, value);
  }
}

export class Subscriber {

  constructor(destinationOrNext) {
    this.destination = new SafeSubscribe(this, destinationOrNext);
  }

  next(value) {
    this.destination.next(value);
  }

}