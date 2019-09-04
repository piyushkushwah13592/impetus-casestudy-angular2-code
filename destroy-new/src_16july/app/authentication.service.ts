import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from './login/login.model';


@Injectable()
export class AuthenticationService {

    constructor(
        private _router: Router) { }

    logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        this._router.navigate(['/']);
    }

    guestLogin(guestRole) {
        localStorage.setItem('role', guestRole);
    }

    login(loggedUser: any) {
        localStorage.setItem('user', loggedUser);
        console.log('*********');
        console.log(localStorage.getItem('user'));
        console.log(loggedUser);
        // this._router.navigate(['Home']);
        // return true;
    }
    // return false;


    checkCredentials() {
        if (localStorage.getItem('user') === null) {
            this._router.navigate(['/']);
        }
    }
}
