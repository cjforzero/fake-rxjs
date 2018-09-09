import { Observable } from "./src/Observable";

Observable.create((observer) => {
  observer.next(1);
  observer.next(2);
}).subscribe((value) => console.log(value));
