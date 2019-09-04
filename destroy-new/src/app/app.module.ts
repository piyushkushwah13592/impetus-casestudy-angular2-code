import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatTableModule } from '@angular/material';
import { MatPaginatorModule, MatIconModule, MatTableDataSource } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogOverviewExampleDialogComponent } from './app.popup';

@NgModule({
  exports: [MatTableModule, MatPaginatorModule, CdkTableModule, MatIconModule, MatRadioModule, MatDialogModule]
})

export class DemoMaterialModule { }

@NgModule({
  declarations: [
    AppComponent, routingComponents, DialogOverviewExampleDialogComponent
  ],
  entryComponents: [DialogOverviewExampleDialogComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, BrowserAnimationsModule, MatCheckboxModule, MatInputModule,
    ReactiveFormsModule, AppRoutingModule, MatButtonModule, MatProgressSpinnerModule, MatSelectModule,
    MatStepperModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, DemoMaterialModule, MatRadioModule
    , MatDialogModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
