import { Component } from '@angular/core';
import { Doctor } from 'src/app/models/doctor';
import { DoctorsService } from 'src/app/services/doctors.service';
import { Router } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.css'],
})
export class DoctorsListComponent {
  constructor(private doctors: DoctorsService, private router: Router) {}
  doctorslist!: Doctor[];
  ngOnInit(): void {
    this.getDoctorslist();
  }

  getDoctorslist() {
    this.doctors
      .getDoctors()
      .subscribe((doctors: Doctor[]) => (this.doctorslist = doctors));
  }

  BookAppointment(id: string, name: string, specialization: string) {
    const DoctorDetails = { id: id, name: name, speciality: specialization };

    this.router.navigate(['/bookingslot'], {
      queryParams: { data: JSON.stringify(DoctorDetails) },
    });
  }
}
