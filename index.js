import Observable from "./src/Observable";

Observable.create((observer) => {
  observer.next(1);
  observer.next(2);
})
  .map(value => value * 2)
  .filter(value => value > 2)
  .subscribe((value) => console.log(value));
