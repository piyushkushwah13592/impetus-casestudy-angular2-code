import { Component, OnInit } from '@angular/core';
import { Login } from './login.model';
import { LoginService } from './login.service';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({

    templateUrl: '../login/login.component.html',
    styleUrls: ['../login/login.component.css'],
    providers: [LoginService, AuthenticationService]
})
export class LoginUserComponent implements OnInit {
    loginForm: FormGroup;
    login: Login;

    hide = true;
    errorMsg: string;

    id: number;
    isFlag = true;
    constructor(private _loginService: LoginService, private _formBuilder: FormBuilder, private _router: Router,
        private _authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.login = new Login(),
            this.loginForm = this._formBuilder.group({
                email: ['', [Validators.required]],
                password: ['', [Validators.required]]
            });

    }


    C_loginUser() {
        this.login = this.loginForm.value;
        this._loginService.S_loginUser(this.login).subscribe(
            resData => {
                this.login = resData;
                console.log(this.login.id);

                this._authenticationService.login(this.login);

                if (this.login.id > 0 && this.login.role === 'user') {
                    console.log(this.login);
                    this._router.navigate(['/searchCity', this.login.id]);
                } else if (this.login.id > 0 && this.login.role === 'admin') {
                    this._router.navigate(['/admin', this.login.id]);
                    alert('hello admin');
                }
            },
            resDataError => {
                this.errorMsg = resDataError;
                alert('please give valid credentials');

            }
        );

    }

    C_registerUser() {
        this._router.navigate(['/registerUser']);

    }

    C_forgotPassword() {
        this._router.navigate(['/forgotPassword']);
    }

    C_guestLogin() {
        const role = 'guest';
        this._router.navigate(['/guestLogin', role]);
    }

}

