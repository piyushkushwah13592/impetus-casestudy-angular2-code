import { Login, Result } from './login.model';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class LoginService {
    constructor(private _http: Http) { }

    S_loginUser(login: Login) {
        return this._http.post('http://localhost:8080/mymovieportal/user/loginChecking', login).map(
            (response: Response) => response.json())
            .catch(this._errorHandler);

    }

    S_getPassword(email: string) {
        return this._http.get('http://localhost:8080/mymovieportal/user/getPassword/' + email).map(
            (response: Response) => response.json()
        );
    }

    S_sendPassword(login: Login) {
        return this._http.post('http://localhost:8080/mymovieportal/mail/forgotPasswordMail/', login).map(
            (response: Response) => response.json()
        );

    }

    _errorHandler(error: Response) {
        console.error(error);
        return Observable.throw(error || 'erver error');

    }

}
