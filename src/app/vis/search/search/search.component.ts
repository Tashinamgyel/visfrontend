import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SearchResult } from '../../../dashboard/models/model';
import { MasterService } from '@app/master-management/services/master.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  triggerSearchResultTable = false;
  searchForm: FormGroup;
  TABLE_DATA!: SearchResult[];

  /**
   * @description this is for search
   */
  displayedColumns: string[] = ['patientId', 'earTagNumber', 'microchipNumber', 'id', 'animalName', 'actions'];

  dataSource: any[] = [];

  constructor(private fb: FormBuilder, private service: MasterService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  /**
   * @description This will initialize search form
   * @return void
   */
  initializeForm(): void {
    this.searchForm = this.fb.group({
      patientId: new FormControl('', Validators.required),
      earTagNumber: new FormControl('', Validators.required),
      microchipNumber: new FormControl('', Validators.required),
      petRegistrationNumber: new FormControl('', Validators.required),
      cidNumber: new FormControl('', Validators.required),
      animalName: new FormControl('', Validators.required),
    });
  }

  /**
   * @description This will send search params and get registration data
   * @return void
   */

  showPID(): void {
    this.dataSource = [];
    // console.log('sdsadsadsada');
    this.triggerSearchResultTable = true;
    // console.log('searchForm', this.searchForm.value);
    this.service.searchBy(this.searchForm.value).subscribe((res) => {
      //   console.log('res', res);
      try {
        for (let i = 0; i < res['length']; i++) {
          this.dataSource[i] = res[i];
        }
      } catch (error) {}
    });
  }

  printPage() {
    window.print();
  }
}
