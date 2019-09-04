import { element } from 'protractor';
import { SeatBooking, MovieTheatre, ConfirmSeatMail } from './seatbooking.model';
import { Theatres } from './theatre.model';
import { City } from './city.model';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { SearchService } from './search.service';
import { Movie } from './movie.model';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Result } from '../login/login.model';
import { AuthenticationService } from '../authentication.service';
import { DialogOverviewExampleDialogComponent } from '../app.popup';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';




export interface Element {
    sbSeatBookingId: number;
    sbCityName: string;
    sbMovieName: string;
    sbTheatreName: string;
    sbStatus: string;
    sbShowTime: string;
    sbDate: string;
    seatName: string;

}
let elementArr: Array<Element> = new Array;

@Component({
    styleUrls: ['../search/search.component.css','../login/css/style.css'],
    templateUrl: '../search/search.component.html',
    providers: [SearchService, DatePipe, AuthenticationService]
})
export class SearchCityComponent implements OnInit {
    cities: City[];
    selectedCity: string;
    theatres: Theatres[];
    movies: Movie[];
    id: number;
    seatBooking: SeatBooking;
    movieTheatre: MovieTheatre;
    times: Array<string> = new Array;
    isConfirm: Boolean = true;
    minDate = new Date();
    maxDate = new Date(2020, 0, 1);
    flag = true;
    cancelSeatMail: ConfirmSeatMail;
    rs: Result;
    searchForm: FormGroup;



    displayedColumns = ['city name', 'theatre name', 'movie name', 'action', 'date', 'showtime', 'seat name'];
    dataSource: any;


    flag2 = true;
    cancel = false;
    role: string;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private _searchService: SearchService, private _router: Router, private _activatedRouter: ActivatedRoute,
        private _datepipe: DatePipe, private _authenticationService: AuthenticationService, private dialog: MatDialog
        , private _formBuilder: FormBuilder) { }




    ngOnInit() {
        this.seatBooking = new SeatBooking();
        this.movieTheatre = new MovieTheatre();
        this.id = this._activatedRouter.snapshot.params['id'];
        this.role = this._activatedRouter.snapshot.params['role'];

        if (this.role !== 'guest') {
            this._authenticationService.checkCredentials();
        }


        this._searchService.S_getCities().subscribe(resData => this.cities = resData);
        console.log(this.id);
        this.cancelSeatMail = new ConfirmSeatMail();
        this.rs = new Result();

        this.searchForm = new FormGroup({
            city: new FormControl('', [Validators.required, Validators.minLength(1)]),
            theatre: new FormControl('', [Validators.required, Validators.minLength(1)]),
            movie: new FormControl('', [Validators.required, Validators.minLength(1)]),
            date: new FormControl('', [Validators.required, Validators.minLength(1)]),
            time: new FormControl('', [Validators.required, Validators.minLength(1)]),
        });

    }



    getTheatres(cityId: number) {
        console.log(cityId);
        this.seatBooking.sbCityId = cityId;
        this._searchService.S_getTheatres(cityId).subscribe(resData => {
            this.theatres = resData;
            console.log(this.theatres);
            if (this.theatres.length === 0) {
              //  this.movies = [];
              //  this.times = [];
              //  this.flag2 = true;
            }

        });


    }
    getMovies(theatreId: number) {
        console.log(theatreId);
        this.seatBooking.sbTheatreId = theatreId;
        this.movieTheatre.mtTheatreId = theatreId;
        this._searchService.S_getMovies(theatreId).subscribe(resData => {
            this.movies = resData;
            this.readyToWidget(this.seatBooking.sbShowTime);
            console.log(this.movies);

        });

    }
    getShowTime(movieId: number) {
        console.log(movieId);

        this.seatBooking.sbMovieId = movieId;
        this.movieTheatre.mtMovieId = movieId;
        this.readyToWidget(this.seatBooking.sbShowTime);
        this._searchService.S_getTimes(this.movieTheatre).subscribe(resData => {
            this.times = resData;
            console.log(this.times);
            console.log(resData);
        });
    }
    readyToWidget(time: any) {

        this.seatBooking.sbShowTime = time;
        console.log(this.seatBooking.sbShowTime);
        console.log(this.seatBooking.sbDate);

        //// if (this.seatBooking.sbDate !== undefined && this.seatBooking.sbMovieId !== undefined
        //   && this.seatBooking.sbShowTime !== undefined && this.seatBooking.sbTheatreId !== undefined) {
        //   this.flag2 = false;
        // } else {
        //     this.flag2 = true;
        // }

        console.log(this.seatBooking);
        console.log('User id' + this.id);
    }

    addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
        const minD = this._datepipe.transform(event.value, 'yyyy-MM-dd');
        console.log(minD);
        this.seatBooking.sbDate = minD;

        this.readyToWidget(this.seatBooking.sbShowTime);

    }

    goToWidget() {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                'cityId': this.seatBooking.sbCityId,
                'theatreId': this.seatBooking.sbTheatreId,
                'movieId': this.seatBooking.sbMovieId,
                'showTime': this.seatBooking.sbShowTime,
                'showDate': this.seatBooking.sbDate,
                'userId': this.id,
                'role': this.role
            }, skipLocationChange: true
        };
        this._router.navigate(['seat-page'], navigationExtras);
    }

    getUserHistory() {
        console.log(this.id);
        this.flag = false;
        this._searchService.S_getUserHistory(this.id).subscribe(resData => {
            elementArr = resData;
            this.flag = false;
            //   this.dataSource = elementArr;
            this.dataSource = new MatTableDataSource<Element>(elementArr);
            this.dataSource.paginator = this.paginator;
            console.log(elementArr);


        });
    }

    applyFilter(filterValue: string) {
        console.log(filterValue);
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }

    cancelTicket() {
        console.log(this.id);
        this.flag = false;
        this.cancel = true;
        this._searchService.S_CancelTicket(this.id).subscribe(resData => {
            elementArr = resData;
            // this.dataSource = elementArr;
            this.dataSource = new MatTableDataSource<Element>(elementArr);
            this.dataSource.paginator = this.paginator;
            console.log(elementArr);



        });
    }

    goToCancelTickets(seatBookingId: number, element1: Element) {
        console.log(element1 + '**********');
        this._searchService.S_goToCancelTicket(element1.sbSeatBookingId).subscribe(resData => {
            seatBookingId = resData;
            console.log(element1);
            console.log(seatBookingId);
            const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
                width: '500px',
                data: { name: 'you successfully cancelled your ticket\n you will get confirmation mail of cancellation' }
            });
            //   alert('you successfully cancelled your ticket\n you will get confirmation mail of cancellatin.');
            this.cancelTicket();
        });
        this.cancelSeatMail.seatNames[0] = element1.seatName;
        this.cancelSeatMail.date = element1.sbDate;
        this.cancelSeatMail.time = element1.sbShowTime;
        this.cancelSeatMail.theatreName = element1.sbTheatreName;
        this.cancelSeatMail.movieName = element1.sbMovieName;
        this.cancelSeatMail.id = this.id;


        this._searchService.S_cancelSeatMail(this.cancelSeatMail).subscribe(resData => {
            this.rs.result = resData;
            console.log(this.rs.result);
        });
    }

    logout() {
        this._authenticationService.logout();
    }

    previousPage() {
        this.flag = true;
        this.cancel = false;
    }


}

