import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, of } from 'rxjs';
import { Staff, StatData, Task } from '@app/dashboard/models/model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  public loadUnderCorpusData(): Observable<StatData> {
    return of({
      total: 50,
    });
  }

  public loadOngoingData(): Observable<StatData> {
    return of({
      total: 15,
    });
  }

  public loadAppealedData(): Observable<StatData> {
    return of({
      total: 5,
    });
  }

  public loadClosedData(): Observable<StatData> {
    return of({
      total: 21,
    });
  }

  public loadTotalCases(): Observable<StatData> {
    return of({
      total: 2322,
    });
  }

  public loadStaffPresentStatus(): Observable<Staff[]> {
    return of([
      {
        staffName: 'Poojan Sharma',
        email: 'poojan.d.sharma@gmail.com',
        status: 'Hospital',
      },
      {
        staffName: 'Aman Mongar',
        email: 'aman.mongar@gmail.com',
        status: 'Present',
      },
      {
        staffName: 'Amrita Limboo',
        email: 'alimboo@oag.gov.bt',
        status: 'Present',
      },
      {
        staffName: 'Phurpa Thinley',
        email: 'phurpathinley@oag.gov.bt',
        status: 'Present',
      },
      {
        staffName: 'Khemlal Chhetri',
        email: 'khemlal@oag.gov.bt',
        status: 'Present',
      },
      {
        staffName: 'Prakriti Rai',
        email: 'prakritirai@oag.gov.bt',
        status: 'Maternity Leave',
      },
    ]);
  }
}
