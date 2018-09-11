import { Subscriber, } from "../Subscriber";

class MapSubscribe extends Subscriber {
  constructor(destinationOrNext, project) {
    super(destinationOrNext);
    this.project = project;
  }

  _next(value) {
    let result = this.project.call(this, value);
    this.destination.next(result);
  }
}

class MapOperator {
  constructor(project) {
    this.project = project;
  }

  call(subscribe, source) {
    return source.subscribe(new MapSubscribe(subscribe, this.project));
  }

}

export function higherOrderMap(project) {
  return (source) => {
    if (typeof project !== 'function') {
      throw new Error('argument is not a function')
    }
    return source.lift(new MapOperator(project));
  }
}
