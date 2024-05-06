import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppointmentService } from 'src/app/services/appointment.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-patient-entry',
  templateUrl: './patient-entry.component.html',
  styleUrls: ['./patient-entry.component.css'],
})
export class PatientEntryComponent implements OnInit {
  myForm!: FormGroup;
  selectedDate: string = this.data.date.toISOString();
  selectedSlot: string = this.data.slot;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bookservice: AppointmentService,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<PatientEntryComponent>
  ) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit(form: FormGroup) {
    const appointment = {
      id: uuid(),
      patientsname: this.myForm.get('name')!.value,
      patientsDescription: this.myForm.get('description')!.value,
      date: this.datePipe.transform(this.data.date, 'yyyy-MM-dd'),
      slot: this.data.slot,
      docId: this.data.id,
    };

    this.bookservice.saveAppointments(appointment).subscribe();
    this.dialogRef.close();
  }
}
