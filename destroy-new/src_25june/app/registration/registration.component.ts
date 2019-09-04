import { Component, OnInit, ViewChild } from '@angular/core';
import { Registration } from './registration.model';
import { RegistrationService } from './registration.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';


@Component({

    templateUrl: '../registration/registration.component.html',
    styleUrls: ['../registration/registration.component.css'],
    providers: [RegistrationService]
})



export class RegisterUserComponent implements OnInit {
    errorMsg: any;

    mobnumPattern = '^((\\+91-?)|0)?[0-9]{10}$';
    flag = false;
    isConfirm = false;
    isEmailCheck = false;
    isContactCheck = false;
    registrationForm: FormGroup;
    registration: Registration;

    constructor(private _registrationService: RegistrationService, private _formBuilder: FormBuilder, private _router: Router) { }
    ngOnInit() {
        this.registration = new Registration(),
            this.registrationForm = this._formBuilder.group({
                name: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(2)]],
                lastName: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(2)]],
                email: ['', [Validators.required, Validators.maxLength(30), Validators.email]],
                contactNumber: ['', [Validators.required, Validators.pattern(this.mobnumPattern)]],
                password: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[1-9]{1}[a-z]{2}[A-Z]{3}$')]],
                confirmPassword: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[1-9]{1}[a-z]{2}[A-Z]{3}$')]]
            });
    }

    C_registerUser() {
        this.flag = false;
        this.isConfirm = false;
        this.isEmailCheck = false;
        this.isContactCheck = false;

        this.registration = this.registrationForm.value;

        this._registrationService.S_emailExistence(this.registration.email).subscribe(
            resData => {
                if (resData) {
                    this.isEmailCheck = resData;
                } else {
                    this._registrationService.S_contactExistence(this.registration.contactNumber).subscribe(
                        // tslint:disable-next-line:no-shadowed-variable
                        resData => {
                            if (resData) {
                                this.isContactCheck = resData;
                            } else {
                                if (this.registration.password === this.registration.confirmPassword) {
                                    this._registrationService.S_registerUser(this.registration).subscribe(
                                        // tslint:disable-next-line:no-shadowed-variable
                                        resData => {
                                            this.flag = resData;
                                            if (this.flag) {
                                                alert('Signup Successfully');
                                                this._router.navigate(['/loginUser']);
                                            }
                                            // S_registerUser closed
                                        });
                                } else {
                                    this.isConfirm = true;
                                }
                            }

                            // S_contactExistence closed
                        });
                }
                // S_emailExistence closed
            });
    }
}

