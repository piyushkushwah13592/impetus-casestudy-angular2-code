import { SeatComponent } from './seat/seat.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUserComponent } from './login/login.component';
import { RegisterUserComponent } from './registration/registration.component';
import { UserPersonalComponent } from './userpersonal/userpersonal.component';
import { SearchCityComponent } from './search/search.component';
import { ForgotPasswordComponent } from './login/forgot.component';
import { AdminComponent } from './login/admin.component';
import { FileOperationComponent } from './login/fileOperation.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: '/loginUser',
        pathMatch: 'full'
    },
    {
        path: 'loginUser',
        component: LoginUserComponent
    },
    {
        path: 'guestLogin/:role',
        component: SearchCityComponent
    },
    {
        path: 'registerUser',
        component: RegisterUserComponent
    },
    {
        path: 'userPersonal/:id',
        component: UserPersonalComponent
    },
    {
        path: 'searchCity/:id',
        component: SearchCityComponent
    },
    {
        path: 'forgotPassword',
        component: ForgotPasswordComponent
    },
    {
        path: 'seat-page',
        component: SeatComponent
    }
    ,
    {
        path: 'admin/:id',
        component: AdminComponent
    },
    {
        path: 'fileOperations/:id',
        component: FileOperationComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    declarations: [],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }

export const routingComponents = [LoginUserComponent, RegisterUserComponent, UserPersonalComponent,
    SearchCityComponent, ForgotPasswordComponent, SeatComponent, AdminComponent, FileOperationComponent];
