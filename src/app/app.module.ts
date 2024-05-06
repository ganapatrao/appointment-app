import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { DoctorsListComponent } from './components/doctors-list/doctors-list.component';
import { BookAppointmentComponent } from './components/book-appointment/book-appointment.component';
import { PatientEntryComponent } from './components/patient-entry/patient-entry.component';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    DoctorsListComponent,
    BookAppointmentComponent,
    PatientEntryComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
