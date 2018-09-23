import { Subscriber } from "../Subscriber";
import Observable from "../Observable";
import { OuterSubscriber } from "../OuterSubscriber";

class InnerSubscriber extends Subscriber {
  constructor(parent, outerValue, outerIndex) {
    super();
    this.parent = parent;
    this.outerValue = outerValue;
    this.outerIndex = outerIndex;
  }

  _next(value) {
    this.parent.notifyNext(this.outerValue, value, this.outerIndex);
  }

}

export function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
  const destination = new InnerSubscriber(outerSubscriber, outerValue, outerIndex);
  if (result instanceof Observable) {
    return result.subscribe(destination)
  } else if (typeof result.length === 'number') {
    for (let i = 0; i < result.length; i++) {
      destination.next(result[i]);
    }
  }
  return undefined;
}

class SwitchMapSubscribe extends OuterSubscriber {
  constructor(destination, project) {
    super(destination);
    this.project = project;
  }

  _next(value) {
    const result = this.project(value);
    this._innerSub(result, value);
  }

  _innerSub(result, value) {
    subscribeToResult(this, result, value);
  }
}

class SwitchMapOperator {
  constructor(project) {
    this.project = project;
  }

  call(subscribe, source) {
    return source.subscribe(new SwitchMapSubscribe(subscribe, this.project));
  }
}

export function higherOrderSwitchMap(project) {
  return (source) => source.lift(new SwitchMapOperator(project));
}