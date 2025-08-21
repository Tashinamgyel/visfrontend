import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder } from '@angular/forms';
import { SharedService } from '@app/vis/shared/services/shared.service';
import { MasterService } from '@app/master-management/services/master.service';
import { CredentialsService } from '@app/auth';
import { NotificationService } from '@app/@core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { tr } from 'date-fns/locale';

@Component({
  selector: 'app-data-archival',
  templateUrl: './data-archival.component.html',
  styleUrls: ['./data-archival.component.scss'],
})
export class DataArchivalComponent implements OnInit {
  dataArchival: any;
  displayedColumns: string[] = [
    'slno',
    'document_name',
    //'document_url',
    'view',
  ];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private fb: FormBuilder,
    private visMasterService: SharedService,
    private service: MasterService,
    private credentialsService: CredentialsService,
    private router: Router,
    private dialog: MatDialog,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    // this.initializeForm();
    this.populateForm();
  }

  populateForm() {
    this.visMasterService.getDataArchival().subscribe((res) => {
      this.dataArchival = res;
      this.dataSource.data = res;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  if2016: boolean = false;
  if2017: boolean = false;
  if2018: boolean = false;
  if2019: boolean = false;
  if2020: boolean = false;
  if2021: boolean = false;
  if2022: boolean = false;
  NotifiableDiseases: boolean = false;

  viewMass(documentName: string) {
    if (documentName == 'Clinical, Deworming, Sterilization And Vaccination 2016 (20 Dzongkhags)') {
      this.if2016 = true;
      this.if2017 = false;
      this.if2018 = false;
      this.if2019 = false;
      this.if2020 = false;
      this.if2021 = false;
      this.if2022 = false;
      this.NotifiableDiseases = false;
    }
    if (documentName == 'Clinical, Deworming, Sterilization And Vaccination 2017 (20 Dzongkhags)') {
      this.if2016 = false;
      this.if2017 = true;
      this.if2018 = false;
      this.if2019 = false;
      this.if2020 = false;
      this.if2021 = false;
      this.if2022 = false;
      this.NotifiableDiseases = false;
    }
    if (documentName == 'Clinical, Deworming, Sterilization And Vaccination 2018 (20 Dzongkhags)') {
      this.if2016 = false;
      this.if2017 = false;
      this.if2018 = true;
      this.if2019 = false;
      this.if2020 = false;
      this.if2021 = false;
      this.if2022 = false;
      this.NotifiableDiseases = false;
    }
    if (documentName == 'Clinical, Deworming, Sterilization And Vaccination 2019 (20 Dzongkhags)') {
      this.if2016 = false;
      this.if2017 = false;
      this.if2018 = false;
      this.if2019 = true;
      this.if2020 = false;
      this.if2021 = false;
      this.if2022 = false;
      this.NotifiableDiseases = false;
    }
    if (documentName == 'Clinical, Deworming, Sterilization And Vaccination 2020 (20 Dzongkhags)') {
      this.if2016 = false;
      this.if2017 = false;
      this.if2018 = false;
      this.if2019 = false;
      this.if2020 = true;
      this.if2021 = false;
      this.if2022 = false;
      this.NotifiableDiseases = false;
    }
    if (documentName == 'Clinical, Deworming, Sterilization And Vaccination 2021 (20 Dzongkhags)') {
      this.if2016 = false;
      this.if2017 = false;
      this.if2018 = false;
      this.if2019 = false;
      this.if2020 = false;
      this.if2021 = true;
      this.if2022 = false;
      this.NotifiableDiseases = false;
    }
    if (documentName == 'Clinical, Deworming, Sterilization And Vaccination 2022 (20 Dzongkhags)') {
      this.if2016 = false;
      this.if2017 = false;
      this.if2018 = false;
      this.if2019 = false;
      this.if2020 = false;
      this.if2021 = false;
      this.if2022 = true;
      this.NotifiableDiseases = false;
    }
    if (documentName == 'Notifiable Diseases') {
      this.if2016 = false;
      this.if2017 = false;
      this.if2018 = false;
      this.if2019 = false;
      this.if2020 = false;
      this.if2021 = false;
      this.if2022 = false;
      this.NotifiableDiseases = true;
    }
  }
}
