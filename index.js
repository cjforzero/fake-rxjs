import Observable from "./src/Observable";
import { higherOrderSwitchMap } from "./src/operator/switchMap";
import { higherOrderFilter } from "./src/operator/filter";
import { higherOrderMap } from "./src/operator/map";
import { higherOrderCombineLatest } from "./src/operator/combineLatest";

Observable.prototype.map = function (project) {
  return higherOrderMap(project)(this);
};

Observable.prototype.filter = function (predicate) {
  return higherOrderFilter(predicate)(this);
};

Observable.prototype.switchMap = function (project) {
  return higherOrderSwitchMap(project)(this);
};

Observable.prototype.combineLatest = function (observables) {
  return higherOrderCombineLatest(observables)(this);
};

Observable.create((observer) => {
  observer.next(1);
  observer.next(2);
})
  .combineLatest([Observable.create(observer => observer.next(3))])
  .subscribe((value) => console.log(value));
