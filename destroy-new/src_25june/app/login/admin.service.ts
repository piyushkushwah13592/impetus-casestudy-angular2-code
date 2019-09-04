import { Admin } from './admin.model';
import { Result } from './login.model';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Theatres } from '../search/theatre.model';


@Injectable()
export class AdminService {
    constructor(private _http: Http) { }

    S_insertCity(admin: Admin) {
        return this._http.post('http://localhost:8080/mymovieportal/admin/insertCity', admin).map(
            (response: Response) => response.json()
        );
    }

    S_insertTheatre(admin: Admin) {
        return this._http.post('http://localhost:8080/mymovieportal/admin/insertTheatre', admin).map(
            (response: Response) => response.json()
        );
    }

    S_insertMovie(admin: Admin) {
        return this._http.post('http://localhost:8080/mymovieportal/admin/insertMovie', admin).map(
            (response: Response) => response.json()
        );
    }

    S_getTheatres() {
        return this._http.get('http://localhost:8080/mymovieportal/theatre/getTheatres').map(
            (response: Response) => response.json()
        );
    }

    S_getMovies() {
        return this._http.get('http://localhost:8080/mymovieportal/movie/getMovies').map(
            (response: Response) => response.json()
        );
    }

    S_deleteCity(admin: Admin) {
        return this._http.post('http://localhost:8080/mymovieportal/admin/deleteCity', admin).map(
            (response: Response) => response.json()
        );
    }

    S_deleteTheatre(admin: Admin) {
        return this._http.post('http://localhost:8080/mymovieportal/admin/deleteTheatre', admin).map(
            (response: Response) => response.json()
        );
    }

    S_deleteMovie(admin: Admin) {
        return this._http.post('http://localhost:8080/mymovieportal/admin/deleteMovie', admin).map(
            (response: Response) => response.json()
        );
    }

    S_movieUpload(resultObj: Result) {
        return this._http.post('http://localhost:8080/mymovieportal/movie/movieOperationThroughCSV', resultObj).map(
            (response: Response) => response.json());


    }

    S_addMovieThroughXML(resultObj: Result) {
        return this._http.post('http://localhost:8080/mymovieportal/movie/movieInsertOperationThroughXml', resultObj).map(
            (response: Response) => response.json());


    }

    S_deleteMovieThroughXML(resultObj: Result) {
        return this._http.post('http://localhost:8080/mymovieportal/movie/movieDeleteOperationThroughXml', resultObj).map(
            (response: Response) => response.json());
    }

    S_pdfGenerate(resultObj: Result) {
        return this._http.post('http://localhost:8080/mymovieportal/movie/writeMovieSummary', resultObj).map(
            (response: Response) => response.json());
    }

    S_pdfGenerate2() {
        return this._http.get('http://localhost:8080/mymovieportal/movie/downloadPDF').map(
            (response: Response) => response.json());
    }
}
