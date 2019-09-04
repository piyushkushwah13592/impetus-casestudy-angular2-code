import { Registration } from './registration.model';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';

// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class RegistrationService {
    constructor(private _http: Http) { }

    S_registerUser(registration: Registration) {
        return this._http.post('http://localhost:8080/mymovieportal/user/save', registration).map(
            (response: Response) => response.json()
        );
    }

    S_emailExistence(email: string) {
        return this._http.get('http://localhost:8080/mymovieportal/user/getEmailExistence/' + email).map(
            (response: Response) => response.json()
        );
    }

    S_contactExistence(contactNumber: string) {
        return this._http.get('http://localhost:8080/mymovieportal/user/getContactExistence/' + contactNumber).map(
            (response: Response) => response.json()
        );
    }
}
