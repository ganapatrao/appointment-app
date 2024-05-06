import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorsListComponent } from './components/doctors-list/doctors-list.component';
import { BookAppointmentComponent } from './components/book-appointment/book-appointment.component';

const routes: Routes = [
  { path: '', redirectTo: '/doctors', pathMatch: 'full' },
  { path: 'doctors', component: DoctorsListComponent },
  { path: 'bookingslot', component: BookAppointmentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
