import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardStateService {
  /**
   * @description Initially setting show search result table to false
   */
  public showSearchTable = new BehaviorSubject<boolean>(false);
  constructor() {}

  setSearchResultTable(changeToggle: boolean) {
    this.showSearchTable.next(changeToggle);
  }

  getSearchResultTable() {
    return this.showSearchTable.asObservable();
  }
}
