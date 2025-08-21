import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { I18nModule } from '@app/i18n';
import { MaterialModule } from '@app/material.module';
import { AuthModule } from '@app/auth';
import { ShellComponent } from './shell.component';
import { NotificationComponent } from '@app/shell/components';
import { UserComponent } from './components';
import { ReactiveFormsModule } from '@angular/forms';
import { MasterManagementComponent } from '@app/shell/components/master-management/master-management.component';
import { PetManagementComponent } from './components/pet-management/pet-management.component';
import { DogManagementComponent } from './components/dog-management/dog-management.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { DiseaseReportComponent } from './components/disease-report/disease-report.component';
import { IndividualComponent } from './components/individual/individual.component';
import { CertificateComponent } from './components/certificate/certificate.component';
import { ReportsComponent } from './components/reports/reports.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    AuthModule,
    I18nModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ShellComponent,
    UserComponent,
    NotificationComponent,
    MasterManagementComponent,
    PetManagementComponent,
    DogManagementComponent,
    UserManagementComponent,
    DiseaseReportComponent,
    IndividualComponent,
    CertificateComponent,
    ReportsComponent,
  ],
})
export class ShellModule {}
