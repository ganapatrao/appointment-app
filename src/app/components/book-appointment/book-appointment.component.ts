import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TIME_SLOTS } from 'src/app/constants/time-slots';
import { PatientEntryComponent } from '../patient-entry/patient-entry.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DatePipe } from '@angular/common';
import { map } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css'],
})
export class BookAppointmentComponent implements OnInit {
  selectedDate = new Date();
  timeslots = TIME_SLOTS;
  selectedTimeSlot: string | null = null;
  docDetails!: { id: string; name: string; speciality: string };
  savedSlots: string[] = [];
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private appointmentService: AppointmentService,
    private datePipe: DatePipe,
    private router: Router, // private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.docDetails = JSON.parse(params['data']);

      console.log(this.docDetails);
      this.getSlotList();
    });
  }

  getSlotList() {
    const selectedDate: string = this.selectedDate
      ? this.selectedDate.toISOString()
      : '';
    const passdate = this.datePipe.transform(selectedDate, 'yyyy-MM-dd') ?? '';

    this.appointmentService
      .checkSlot(this.docDetails.id, passdate)
      .pipe(
        map((data) => {
          return data.map((item) => item.slot);
        })
      )
      .subscribe((slots: string[]) => {
        this.savedSlots = slots;
      });
  }

  onDateChange() {
    this.getSlotList();
  }
  openDialog(): void {
    if (!this.selectedTimeSlot){

      this.snackBar.open("select slot before booking", "OK", {
        duration: 2000, 
      })
      return

    }
    const dialogRef = this.dialog.open(PatientEntryComponent, {
      height: '400px',
      width: '600px',
      data: {
        date: this.selectedDate,
        slot: this.selectedTimeSlot,
        id: this.docDetails.id,
      }, // Pass selected date and time slot to the dialog
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getSlotList();
      this.selectedTimeSlot = null;
    });
  }

  getSelectedTimeSlot(event: any) {
    this.selectedTimeSlot = event.value;
  }

  isSlotBooked(slot: string): boolean {
    return this.savedSlots.includes(slot);
  }

  navigateToDoctor() {
    this.router.navigate(['/doctors']);
  }
}
