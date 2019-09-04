import { Result } from './login.model';
import { AuthenticationService } from './../authentication.service';
import { AdminService } from './admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
    templateUrl: '../login/fileOperation.component.html',
    styleUrls: ['../login/fileOperation.component.css'],
    providers: [AdminService, AuthenticationService]
})
export class FileOperationComponent implements OnInit {
    resultObj: Result;
    yourOperation = 0;
    fileName: string;
    flag: boolean;
    checkOperationFlag = true;
    id: number;


    fileOperations = [
        { value: 1, viewValue: 'Adding/Deleting Movie through CSV' },
        { value: 2, viewValue: 'Addingg Movie through XML' },
        { value: 3, viewValue: 'Deleting Movie through XML' }
    ];



    constructor(private _router: Router, private _adminService: AdminService,
        private _authenticationService: AuthenticationService, private _activatedRouter: ActivatedRoute) {
        this.resultObj = new Result();
    }

    ngOnInit() {
        this._authenticationService.checkCredentials();
        this.id = this._activatedRouter.snapshot.params['id'];
    }

    selectOperation() {
        console.log(this.yourOperation);
    }

    updateFile(file: HTMLInputElement) {
        this.fileName = file.value;
        console.log(this.fileName);
    }

    getFile() {
        if (this.yourOperation < 1) {
            alert('please select your operation');
            this.checkOperationFlag = false;
        }

        if (this.checkOperationFlag) {
            if (this.yourOperation === 1) {
                console.log(this.fileName);
                this.resultObj.result = this.fileName;

                this._adminService.S_movieUpload(this.resultObj).subscribe(resData => {
                    this.flag = resData;
                    console.log(this.flag);
                    if (this.flag) {
                        alert('data operation successfully done');
                       // this._router.navigate(['/admin', this.id]);
                    } else {
                        alert('please check your data');
                    }
                });
            }

            if (this.yourOperation === 2) {
                console.log(this.fileName);
                this.resultObj.result = this.fileName;

                this._adminService.S_addMovieThroughXML(this.resultObj).subscribe(resData => {
                    this.flag = resData;
                    console.log(this.flag);

                    if (this.flag) {
                        alert('movie inserted successfully');
                       // this._router.navigate(['/admin', this.id]);
                    } else {
                        alert('please check your data');
                    }

                });
            }

            if (this.yourOperation === 3) {
                console.log(this.fileName);
                this.resultObj.result = this.fileName;

                this._adminService.S_deleteMovieThroughXML(this.resultObj).subscribe(resData => {
                    this.flag = resData;
                    console.log(this.flag);

                    if (this.flag) {
                        alert('movie deleted successfully');
                       // this._router.navigate(['/admin', this.id]);
                    } else {
                        alert('please check your data');
                    }

                });
            }
        }
    }


    goBack() {
        this._router.navigate(['/admin', this.id]);
    }
}
