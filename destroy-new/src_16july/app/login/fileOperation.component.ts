import { Result } from './login.model';
import { AuthenticationService } from './../authentication.service';
import { AdminService } from './admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogOverviewExampleDialogComponent } from '../app.popup';


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
        { value: 1, viewValue: 'Add/Update Movie through CSV file' },
        { value: 2, viewValue: 'Delete Movie through CSV file' },
        { value: 3, viewValue: 'Add/Update Movie through XML file' },
        { value: 4, viewValue: 'Delete Movie through XML file' }
    ];



    constructor(private _router: Router, private _adminService: AdminService,
        private _authenticationService: AuthenticationService, private _activatedRouter: ActivatedRoute, private dialog: MatDialog) {
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

            const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
                width: '500px',
                data: { name: 'please select your operation' }
            });
            // alert('please select your operation');
            this.checkOperationFlag = false;
        }

        if (this.checkOperationFlag) {
            if (this.yourOperation === 1 || this.yourOperation === 2) {
                console.log(this.fileName);
                this.resultObj.result = this.fileName;

                this._adminService.S_movieUpload(this.resultObj).subscribe(resData => {
                    this.flag = resData;
                    console.log(this.flag);
                    if (this.flag) {

                        const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
                            width: '500px',
                            data: { name: 'data operation successfully done' }
                        });

                    } else {
                        //  this.popup('please check your data');
                        alert('please check your data');
                    }
                });
            }

            if (this.yourOperation === 3) {
                console.log(this.fileName);
                this.resultObj.result = this.fileName;

                this._adminService.S_addMovieThroughXML(this.resultObj).subscribe(resData => {
                    this.flag = resData;
                    console.log(this.flag);

                    if (this.flag) {
                        const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
                            width: '500px',
                            data: { name: 'movie inserted successfully' }
                        });

                    } else {
                        //   this.popup('please check your data');
                        alert('please check your data');
                    }

                });
            }

            if (this.yourOperation === 4) {
                console.log(this.fileName);
                this.resultObj.result = this.fileName;

                this._adminService.S_deleteMovieThroughXML(this.resultObj).subscribe(resData => {
                    this.flag = resData;
                    console.log(this.flag);

                    if (this.flag) {
                        const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
                            width: '500px',
                            data: { name: 'movie deleted successfully' }
                        });

                    } else {
                        // this.popup('please check your data');
                        alert('please check your data');
                    }

                });
            }
        }
    }


    goBack() {
        this._router.navigate(['/admin', this.id]);
    }

    logout() {
        this._authenticationService.logout();
    }
}
