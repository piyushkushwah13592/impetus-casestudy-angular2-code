import { AuthenticationService } from './../authentication.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RegistrationService } from '../registration/registration.service';
import { UserPersonalService } from './userpersonal.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserPersonal } from './userpersonal.model';
import { LoginService } from '../login/login.service';
import { Login } from '../login/login.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogOverviewExampleDialogComponent } from './../app.popup';


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
    passFlag = true;
    passwordChange = false;
    existPassword: string;

    id: number;
    private number: string;
    private email: string;
    //  private password: string;
    constructor(private _userPersonalService: UserPersonalService, private _loginService: LoginService, private _formBuilder: FormBuilder,
        private _router: Router, private _activatedRouter: ActivatedRoute,
        private _registrationService: RegistrationService,
        private _authenticationService: AuthenticationService, private dialog: MatDialog) { }

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
                    this.existPassword = this.userPersonal.password;
                    console.log(this.userPersonal.name);
                    console.log(this.userPersonal.lastName);
                    console.log(this.userPersonal.password);
                    this.count++;
                });
        }


        this.userPersonalForm = this._formBuilder.group({
            name: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(2)]],
            lastName: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.maxLength(30), Validators.email]],
            contactNumber: ['', [Validators.required, Validators.pattern(this.mobnumPattern)]],
            oldPassword: ['', [Validators.minLength(5), Validators.pattern('^[1-9]{1}[a-z]{2}[A-Z]{3}$')]],
            password: ['', [Validators.minLength(5), Validators.pattern('^[1-9]{1}[a-z]{2}[A-Z]{3}$')]],
            confirmPassword: ['', [Validators.minLength(5), Validators.pattern('^[1-9]{1}[a-z]{2}[A-Z]{3}$')]]
        });

    }


    changePassword() {
        this.passwordChange = true;
        this.passFlag = false;
        this.isOldPassword = true;
        this.isEmailCheck = false;
        this.isContactCheck = false;
        this.isConfirm = true;
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

                        if (!this.passwordChange) {
                            this.login.password = this.existPassword;
                        }

                        this._loginService.S_loginUser(this.login).subscribe(
                            // tslint:disable-next-line:no-shadowed-variable
                            resData => {
                                this.login = resData;
                                this.isOldPassword = true;
                                if (this.isOldPassword) {

                                    if (!this.passwordChange) {
                                        this.userPersonal.password = this.existPassword;
                                        this.userPersonal.oldPassword = this.existPassword;
                                        this.userPersonal.confirmPassword = this.existPassword;
                                        console.log('****' + this.userPersonal.password);
                                    }

                                    if (this.userPersonal.password === this.userPersonal.confirmPassword) {
                                        this._userPersonalService.S_updateUser(this.userPersonal, this.id).subscribe(
                                            // tslint:disable-next-line:no-shadowed-variable
                                            resData => {
                                                this.isFlag = resData;
                                                if (this.isFlag) {
                                                    const dialogRef2 = this.dialog.open(DialogOverviewExampleDialogComponent, {
                                                        width: '500px',
                                                        data: {
                                                            // tslint:disable-next-line:max-line-length
                                                            name: 'profile updated successfully'
                                                        }

                                                    }); // popup closed
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

    disableIsConfirm() {
        this.isConfirm = true;
    }

    disableIsContactCheck() {
        this.isContactCheck = false;
    }
    disableIsEmailCheck() {
        this.isEmailCheck = false;
    }

    disableIsOldPassword() {
        this.isOldPassword = true;
    }
}


