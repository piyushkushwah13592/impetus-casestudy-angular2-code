import { Subscription } from 'rxjs/';
import { Component, Input, Injectable, ApplicationRef, ChangeDetectorRef, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { IdleTimeoutService } from './app.idletimeoutservice';
import { Observable, Subject, BehaviorSubject } from 'rxjs/';
import { Pipe, PipeTransform } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    templateUrl: './login/login.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class TimeoutComponent implements OnInit {
    public _counter = 0;
    public _status = 'Initialized.';
    private _timer: Observable<number>;
    private _timerSubscription: Subscription;
    private _idleTimerSubscription: Subscription;

    constructor(private changeRef: ChangeDetectorRef,
        private idleTimeoutSvc: IdleTimeoutService,
    ) {
    }

    public startCounter() {
        if (this._timerSubscription) {
            this._timerSubscription.unsubscribe();
        }

        this._counter = 0;
        this._timer = Observable.timer(1000, 1000);
        this._timerSubscription = this._timer.subscribe(n => {
            this._counter++;
            this.changeRef.markForCheck();
        });
    }

    public reset() {
        this.startCounter();
        this._status = 'Initialized.';
        this.idleTimeoutSvc.resetTimer();
    }

    ngOnInit() {
        console.log(this.startCounter());
        this.startCounter();
        this._idleTimerSubscription = this.idleTimeoutSvc.timeoutExpired.subscribe(res => {
            alert('timeout');
            // tslint:disable-next-line:max-line-length
            // const modalPromise = this.dialogSvc.open('Session Expiring!', 'Your session is about to expire. Do you need more time?', true, 'Yes', 'No');
            // tslint:disable-next-line:prefer-const
            //   let newObservable = Observable.fromPromise(modalPromise);
            //  newObservable.subscribe(
            // tslint:disable-next-line:no-shadowed-variable
            //   (res) => {
            //       if (res === true) {
            //         console.log('Extending session...');
            //        this._status = 'Session was extended.';
            //        this.idleTimeoutSvc.resetTimer();
            //       this.startCounter();
            //       this.changeRef.markForCheck();
            //
            //  } else {
            //     console.log('Not extending session...');
            //     this._status = 'Session was not extended.';
            //     this.changeRef.markForCheck();
            //  }
            // },
            ///  (reason) => {
            //      console.log('Dismissed ' + reason);
            ///      this._status = 'Session was not extended.';
            //      this.changeRef.markForCheck();
            //  }
            // );
        });
    }


    // tslint:disable-next-line:use-life-cycle-interface
    ngOnDestroy() {
        this._idleTimerSubscription.unsubscribe();
    }
}
