import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;

  constructor() { };

  ngOnInit() {
    const customIntervalObservable = Observable.create(observer => {
      let count = 0;
      setInterval(handler:() => {
        observer.next(count);
        if (count == 2) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error(message: 'Count is greater than 3'));
        }
        count++;
    }, timeout: 1000);
    });

    customIntervalObservable.pipe(map(project: (data: number) => {
      return 'Round: ' + (data +1_)
        ;    }));

    this.firstObsSubscription = customIntervalObservable.subscribe(data => { console.log(data); }, error => {
      console.log(error);
      alert(error.message);
  }
}
  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }

}

