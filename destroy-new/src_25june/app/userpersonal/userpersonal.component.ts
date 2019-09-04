import { AuthenticationService } from './../authentication.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RegistrationService } from '../registration/registration.service';
import { UserPersonalService } from './userpersonal.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserPersonal } from './userpersonal.model';
import { LoginService } from '../login/login.service';
import { Login } from '../login/login.model';


@Component({

    templateUrl: '../userpersonal/userpersonal.component.html',
    styleUrls: ['../userpersonal/userpersonal.component.css'],
    providers: [UserPersonalService, RegistrationService, LoginService, AuthenticationService]
})
export class UserPersonalComponent implements OnInit {
    errorMsg: any;

    mobnumPattern = '^((\\+91-?)|0)?[0-9]{10}$';
    userPersonalForm: FormGroup;
    userPersonal: UserPersonal;
    isSameEmail = true;
    isEmailCheck = false;
    isContactCheck = false;
    isOldPassword = true;
    isSameNumber = true;
    isConfirm = true;
    isFlag: string;
    login: Login;
    count = 0;
    pass = false;

    id: number;
    private number: string;
    private email: string;
    constructor(private _userPersonalService: UserPersonalService, private _loginService: LoginService, private _formBuilder: FormBuilder,
        private _router: Router, private _activatedRouter: ActivatedRoute,
        private _registrationService: RegistrationService, private _authenticationService: AuthenticationService) { }

    ngOnInit() {
        this._authenticationService.checkCredentials();
        this.id = this._activatedRouter.snapshot.params['id'];

        if (this.count === 0) {
            this.userPersonal = new UserPersonal();
            this._userPersonalService.S_getUserInfo(this.id).subscribe(
                resData => {
                    this.userPersonal = resData;
                    this.number = this.userPersonal.contactNumber;
                    this.email = this.userPersonal.email;
                    console.log(this.userPersonal.name);
                    console.log(this.userPersonal.lastName);
                    this.count++;
                });
        }


        this.userPersonalForm = this._formBuilder.group({
            name: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(2)]],
            lastName: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.maxLength(30), Validators.email, Validators.email]],
            contactNumber: ['', [Validators.required, Validators.pattern(this.mobnumPattern)]],
            oldPassword: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[1-9]{1}[a-z]{2}[A-Z]{3}$')]],
            password: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[1-9]{1}[a-z]{2}[A-Z]{3}$')]],
            confirmPassword: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[1-9]{1}[a-z]{2}[A-Z]{3}$')]]
        });

    }


    showpass() {
        this.pass = true;
    }

    C_userPersonal() {
        this.isOldPassword = true;

        this.userPersonal = this.userPersonalForm.value;
        this._registrationService.S_emailExistence(this.userPersonal.email).subscribe(
            resData => {
                if (this.email === this.userPersonal.email) {
                    this.isEmailCheck = false;
                } else {
                    this.isEmailCheck = true;
                }

                this._registrationService.S_contactExistence(this.userPersonal.contactNumber).subscribe(
                    // tslint:disable-next-line:no-shadowed-variable
                    resData => {

                        if (this.number === this.userPersonal.contactNumber) {
                            this.isContactCheck = false;
                        } else {
                            this.isContactCheck = true;
                        }
                        this.login = new Login();
                        this.login.email = this.email;
                        this.login.password = this.userPersonal.oldPassword;
                        this._loginService.S_loginUser(this.login).subscribe(
                            // tslint:disable-next-line:no-shadowed-variable
                            resData => {
                                this.login = resData;
                                this.isOldPassword = true;
                                if (this.isOldPassword) {
                                    if (this.userPersonal.password === this.userPersonal.confirmPassword) {
                                        this._userPersonalService.S_updateUser(this.userPersonal, this.id).subscribe(
                                            // tslint:disable-next-line:no-shadowed-variable
                                            resData => {
                                                this.isFlag = resData;
                                                if (this.isFlag) {
                                                    alert('your profile updated successfully');
                                                    this._router.navigate(['/loginUser']);
                                                    this._authenticationService.logout();
                                                }
                                            });
                                    } else {
                                        this.isConfirm = false;
                                    }
                                }
                            },
                            resDataError => {
                                this.errorMsg = resDataError;
                                this.isOldPassword = false;
                                console.log(this.errorMsg);

                                // S_loginUser closed
                            });

                        // S_contactExistence
                    });

                // S_emailExistence closed
            });
    }
}

