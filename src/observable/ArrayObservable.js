import Observable from "../Observable";

export class ArrayObservable extends Observable {
  constructor(array) {
    super();
    this.array = array;
  }

  _subscribe(subscribe) {
    const array = this.array;
    const count = array.length;
    for (let i = 0; i < count; i++) {
      subscribe.next(array[i])
    }
    subscribe.complete();
  }
}