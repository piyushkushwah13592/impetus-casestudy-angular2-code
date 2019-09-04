import { SearchService } from './../search/search.service';
import { AdminService } from './admin.service';
import { Component, OnInit } from '@angular/core';
import { Admin, CityTheatre, Showtime, MovieTheatre } from './admin.model';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { City } from '../search/city.model';
import { Theatres } from '../search/theatre.model';
import { Movie } from '../search/movie.model';
import { AuthenticationService } from '../authentication.service';
import { Result } from './login.model';
import * as jsPDF from 'jspdf';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogOverviewExampleDialogComponent } from './../app.popup';




@Component({

    templateUrl: '../login/admin.component.html',
    styleUrls: ['../login/login.component.css','../login/css/style.css'],
    providers: [AdminService, SearchService, AuthenticationService]
})

export class AdminComponent implements OnInit {
    timeExistsFlag = false;


    cityTheatreForm: FormGroup;
    movieTheatreForm: FormGroup;

    format = 'HH:mm:ss';

    resultObj: Result;
    insertForm: FormGroup;
    deleteForm: FormGroup;
    admin: Admin;
    value: string;
    activeFlag = false;
    insertFlag = false;
    deleteFlag = false;
    repeatFlag = false;
    emptyFlag = false;
    id: number;
    city: City;
    cityArray: City[];
    theatre: Theatres;
    theatreArray: Theatres[];
    movie: Movie;
    movieArray: Movie[];
    times: Array<string> = new Array;

    cityTheatreFlag = false;
    cityTheatre: CityTheatre;
    cities: City[];
    theatres: Theatres[];

    movieTheatreFlag = false;
    movieTheatre: MovieTheatre;
    movies: Movie[];
    showtimes: Showtime[];

    errorMsg: string;

    timeFlag = false;
    wrongDateFlag = false;
    timeForm: FormGroup;

    values = '';

    constructor(private _formBuilder: FormBuilder, private _router: Router, private _adminService: AdminService,
        private _searchService: SearchService, private _authenticationService: AuthenticationService,
        private _activatedRouter: ActivatedRoute, private dialog: MatDialog) { }


    ngOnInit() {
        this.admin = new Admin();
        this.city = new City();
        this.theatre = new Theatres();
        this.resultObj = new Result();
        this._authenticationService.checkCredentials();
        this.id = this._activatedRouter.snapshot.params['id'];

        this.cityTheatre = new CityTheatre();
        this.movieTheatre = new MovieTheatre();

        // this.value = 'city';
    }

    activeValue(str: string) {
        this.activeFlag = true;
        this.emptyFlag = false;
        this.movieTheatreFlag = false;
        this.cityTheatreFlag = false;
        //  this.insertFormData();

        if (str === 'c') {

            this.value = 'city';
        }
        if (str === 't') {
            this.value = 'theatre';
        }
        if (str === 'm') {
            this.value = 'movie';
        }
        console.log(this.value);


    }

    insertFormData() {
        this.repeatFlag = false;
        this.emptyFlag = false;
        this.insertFlag = true;
        this.deleteFlag = false;
        this.cityTheatreFlag = false;
        this.movieTheatreFlag = false;
        this.timeFlag = false;



        this.insertForm = this._formBuilder.group({
            cityName: ['', [Validators.required]],
            theatreName: ['', [Validators.required]],
            movieName: ['', [Validators.required]]
        });
    }

    insertData() {
        this.repeatFlag = false;
        if (this.value === 'city') {

            this.admin = this.insertForm.value;
            console.log(this.admin.cityName);

            if (this.admin.cityName.trim() === '' || this.admin.cityName === '') {
                this.emptyFlag = true;
            }

            this._searchService.S_getCities().subscribe(resData => {
                this.cityArray = resData;
                let i: number;
                console.log(this.cityArray);
                for (i = 0; i < this.cityArray.length; i++) {
                    if (this.cityArray[i].cityName === this.admin.cityName && this.cityArray[i].cityStatus === 'active') {
                        this.repeatFlag = true;
                        break;

                    }
                }
                if (this.repeatFlag === false && this.emptyFlag === false) {
                    this._adminService.S_insertCity(this.admin).subscribe(
                        // tslint:disable-next-line:no-shadowed-variable
                        resData => {
                            this.city = resData;
                            // alert(this.city.cityName + ' successfully added in city list.');
                            this.insertFlag = false;
                            const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
                                width: '500px',
                                data: { name: this.city.cityName + ' successfully added in city list' }
                            });
                        });
                }
            });

        }

        if (this.value === 'theatre') {

            this.admin = this.insertForm.value;
            console.log(this.admin.theatreName);
            if (this.admin.theatreName.trim() === '' || this.admin.theatreName === '') {
                this.emptyFlag = true;
            }

            console.log(this.admin.theatreName);
            this._adminService.S_getTheatres().subscribe(resData => {
                this.theatreArray = resData;
                let i: number;
                console.log(this.theatreArray);
                for (i = 0; i < this.theatreArray.length; i++) {
                    if (this.theatreArray[i].theatreName === this.admin.theatreName &&
                        this.theatreArray[i].theatreStatus === 'active') {
                        this.repeatFlag = true;
                        break;

                    }
                }
                if (this.repeatFlag === false && this.emptyFlag === false) {
                    this._adminService.S_insertTheatre(this.admin).subscribe(
                        // tslint:disable-next-line:no-shadowed-variable
                        resData => {
                            this.theatre = resData;
                            // alert(this.theatre.theatreName + ' successfully added in theatre list.');
                            this.insertFlag = false;
                            const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
                                width: '500px',
                                data: { name: this.theatre.theatreName + ' successfully added in theatre list' }
                            });
                        });
                }
            });

        }


        if (this.value === 'movie') {
            this.admin = this.insertForm.value;
            console.log(this.admin.movieName);

            if (this.admin.movieName.trim() === '' || this.admin.movieName === '') {
                this.emptyFlag = true;
            }
            this._adminService.S_getMovies().subscribe(resData => {
                this.movieArray = resData;
                let i: number;
                console.log(this.movieArray);
                for (i = 0; i < this.movieArray.length; i++) {
                    if (this.movieArray[i].movieName === this.admin.movieName && this.movieArray[i].movieStatus === 'active') {
                        this.repeatFlag = true;
                        break;

                    }
                }
                if (this.repeatFlag === false) {
                    this._adminService.S_insertMovie(this.admin).subscribe(
                        // tslint:disable-next-line:no-shadowed-variable
                        resData => {
                            this.movie = resData;
                            // alert(this.movie.movieName + ' successfully added in movie list.');
                            this.insertFlag = false;
                            const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
                                width: '500px',
                                data: { name: this.movie.movieName + ' successfully added in movie list' }
                            });
                        });
                }

            });
        }

    }



    deleteFormData() {
        this.deleteFlag = true;
        this.insertFlag = false;
        this.cityTheatreFlag = false;
        this.movieTheatreFlag = false;
        this.timeFlag = false;



        this._searchService.S_getCitiesForDeletion().subscribe(resData => this.cityArray = resData);
        this._adminService.S_getTheatresForDeletion().subscribe(resData => this.theatreArray = resData);
        this._adminService.S_getMoviesForDeletion().subscribe(resData => this.movieArray = resData);
        this.deleteForm = this._formBuilder.group({
            cityName: [''],
            theatreName: [''],
            movieName: ['']
        });
    }

    deleteData() {
        if (this.value === 'city') {
            this.admin = this.deleteForm.value;
            console.log(this.admin.cityName);
            this._adminService.S_deleteCity(this.admin).subscribe(
                resData => {
                    this.city = resData;
                    //  alert(this.city.cityName + ' successfully deleted from city list.');
                    this.deleteFlag = false;
                    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
                        width: '500px',
                        data: { name: this.city.cityName + ' successfully deleted from city list' }
                    });
                });

        }
        if (this.value === 'theatre') {
            this.admin = this.deleteForm.value;
            console.log(this.admin.theatreName);
            this._adminService.S_deleteTheatre(this.admin).subscribe(
                resData => {
                    this.theatre = resData;
                    // alert(this.theatre.theatreName + ' successfully deleted from theatre list.');
                    this.deleteFlag = false;
                    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
                        width: '500px',
                        data: { name: this.theatre.theatreName + ' successfully deleted from theatre list' }
                    });
                });

        }

        if (this.value === 'movie') {
            this.admin = this.deleteForm.value;
            console.log(this.admin.movieName);
            this._adminService.S_deleteMovie(this.admin).subscribe(
                resData => {
                    this.movie = resData;
                    // alert(this.movie.movieName + ' successfully deleted from movie list.');
                    this.deleteFlag = false;
                    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
                        width: '500px',
                        data: { name: this.movie.movieName + ' successfully deleted from movie list' }
                    });
                });

        }
    }


    logout() {
        this._authenticationService.logout();
    }

    fileOperations() {
        this._router.navigate(['/fileOperations', this.id]);
    }

    pdfOperation() {
        this.resultObj.result = 'D:\\MovieSummaryPDF\\a.pdf';
        this._adminService.S_pdfGenerate(this.resultObj).subscribe(
            resData => {
                if (resData) {
                    //  alert('pdf successfully generated');
                    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
                        width: '500px',
                        data: { name: 'pdf successfully generated' }
                    });
                }

            });
    }

    downloadPDF() {
        const doc = new jsPDF();
        this._adminService.S_pdfGenerate2().subscribe(
            resData => {
                this.times = resData;
                doc.text(this.times, 10, 10);
                doc.save('test.pdf');
            });
    }

    cityTheatreFlagChange() {
        this.cityTheatreFlag = true;
        this.deleteFlag = false;
        this.insertFlag = false;
        this.movieTheatreFlag = false;
        this.activeFlag = false;
        this.timeFlag = false;


        this._searchService.S_getCities().subscribe(resData => this.cities = resData);
        this._adminService.S_getTheatres().subscribe(resData => this.theatres = resData);

        this.cityTheatreForm = this._formBuilder.group({
            cityName: ['', [Validators.required]],
            theatreName: ['', [Validators.required]],
        });
    }

    getCityId(cityId: number) {
        this.cityTheatre.ctCityId = cityId;
    }

    getTheatreId(theatreId: number) {
        this.cityTheatre.ctTheatreId = theatreId;
        this.movieTheatre.mtTheatreId = theatreId;
    }

    insertCityTheatreData() {
        console.log(this.cityTheatre);
        this._adminService.S_cityTheatreData(this.cityTheatre).subscribe(
            resData => {
                this.cityTheatre = resData;
                const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
                    width: '500px',
                    data: { name: ' Theatre added in City' }
                });
            }, resDataError => {
                this.errorMsg = resDataError;

                const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
                    width: '500px',
                    data: { name: ' Theatre exists in City' }
                });
            }
        );

    }

    movieTheatreFlagChange() {
        this.movieTheatreFlag = true;
        this.cityTheatreFlag = false;
        this.deleteFlag = false;
        this.insertFlag = false;
        this.activeFlag = false;
        this.timeFlag = false;

        this._adminService.S_getMovies().subscribe(resData => this.movies = resData);
        this._adminService.S_getTheatres().subscribe(resData => this.theatres = resData);
        this._adminService.S_getShowtimes().subscribe(resData => this.showtimes = resData);

        console.log(this.showtimes + '***');



        this.movieTheatreForm = this._formBuilder.group({
            theatreName: ['', [Validators.required]],
            movieName: ['', [Validators.required]],
            showtime: ['', [Validators.required]],
            discount: ['', [Validators.required]],
        });
    }

    getMovieId(movieId: number) {
        this.movieTheatre.mtMovieId = movieId;
    }

    getShowtimeId(showtimeId: number) {
        this.movieTheatre.mtShowtimeId = showtimeId;
    }

    insertMovieTheatreData(discount: number) {

        this.movieTheatre.discount = discount;
        console.log(this.movieTheatre);


        this._adminService.S_movieTheatreData(this.movieTheatre).subscribe(
            resData => {
                this.movieTheatre = resData;
                const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
                    width: '500px',
                    data: { name: ' Movie added in Theatre' }
                });
            }, resDataError => {
                this.errorMsg = resDataError;

                const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
                    width: '500px',
                    data: { name: ' Movie exists in Theatre' }
                });
            }
        );

    }

    timeFlagChange() {
        this.movieTheatreFlag = false;
        this.cityTheatreFlag = false;
        this.deleteFlag = false;
        this.insertFlag = false;
        this.activeFlag = false;
        this.timeFlag = true;

        console.log(this.timeFlag + '****');

        this.timeForm = this._formBuilder.group({
            time: ['', [Validators.required]],
        });
    }

    insertTime(time: string) {
        this.resultObj.result = time;
        this._adminService.S_addTime(this.resultObj).subscribe(
            resData => {
                if (resData) {
                    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
                        width: '500px',
                        data: { name: 'Showtime added' }
                    });
                } else {
                    this.wrongDateFlag = true;
                }

            }, resDataError => {
                this.errorMsg = resDataError;
                this.timeExistsFlag = true;
            });
    }



    disableWrongDateFlag() {
        this.timeExistsFlag = false;
        this.wrongDateFlag = false;
        console.log(this.wrongDateFlag);
    }
    disableEmptyFlag() {
        this.emptyFlag = false;
    }
}
