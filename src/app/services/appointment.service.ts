import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private url = 'http://localhost:3000';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  // getAppointments(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.url}/appointments`);
  // }

  checkSlot(docId: string, date: string): Observable<any[]> {
    return this.http.get<any[]>(
      `http://localhost:3000/appointments?docId=${docId}&date=${date}`
    );
  }

  saveAppointments(appointment: any): Observable<any> {
    return this.http.post<any>(`${this.url}/appointments`, appointment).pipe(
      tap(() => {
        this.openSnackBar('Appointments saved successfully!');
      }),
      catchError((error) => {
        this.openSnackBar('Error saving appointments: ' + error.message);
        throw error;
      })
    );
  }

  private openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000, // 5 seconds
    });
  }
}
