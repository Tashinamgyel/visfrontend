import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisRoutingModule } from './vis-routing.module';
import { RegistrationComponent } from './individual/components/registration/registration.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/@shared';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VisComponent } from './shared/components/vis.component';
import { PetRegistrationComponent } from './pet-registration/component/pet-registration/pet-registration.component';
import { PetRenewalComponent } from './pet-registration/component/pet-renewal/pet-renewal.component';
import { OwnershipTransferComponent } from './pet-registration/component/ownership-transfer/ownership-transfer.component';
import { PetInformationComponent } from './pet-registration/component/pet-information/pet-information.component';
import { MassDogVaccicationComponent } from './dog-management/components/mass-dog-vaccication/mass-dog-vaccication.component';
import { DogSterilizationComponent } from './dog-management/components/dog-sterilization/dog-sterilization.component';
import { TreatmentComponent } from './individual/components/treatment/treatment.component';
import { TreatmentDetailComponent } from '@app/vis/mass/components/treatment-detail/treatment-detail.component';
import { MassVaccinationComponent } from '@app/vis/mass/components/mass-vaccination/mass-vaccination.component';
import { MassRegistrationComponent } from '@app/vis/mass/components/mas-registration/mass-registration.component';
import { FlashReportComponent } from './disease-outbreak/components/flash-report/flash-report.component';
import { FollowUpReportComponent } from './disease-outbreak/components/follow-up-report/follow-up-report.component';
import { EpidemiologyComponent } from './disease-outbreak/components/epidemiology/epidemiology.component';
import { SterilizationComponent } from '@app/vis/individual/components/sterilization/sterilization.component';
import { ClinicalComponent } from '@app/vis/individual/components/clinical/clinical.component';
import { DewormingComponent } from '@app/vis/individual/components/deworming/deworming.component';
import { VaccinationComponent } from '@app/vis/individual/components/vaccination/vaccination.component';
import { MassDewormingComponent } from '@app/vis/mass/components/mass-deworming/mass-deworming.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PoultryCaseComponent } from '@app/vis/disease-outbreak/components/poultry-case/poultry-case.component';
import { OutbreakDetailComponent } from './disease-outbreak/components/outbreak-detail/outbreak-detail.component';
import { AddPoultryComponent } from './disease-outbreak/components/add-poultry/add-poultry.component';
import { AddAnimalComponent } from './disease-outbreak/components/add-animal/add-animal.component';
import { AddSusceptibleComponent } from './disease-outbreak/components/add-susceptible/add-susceptible.component';
import { PetHealthCertificateComponent } from './pet-registration/component/pet-health-certificate/pet-health-certificate.component';
import { AddFollowUpComponent } from './disease-outbreak/components/add-follow-up/add-follow-up.component';
import { AddOwnerComponent } from './disease-outbreak/components/add-owner/add-owner.component';
import { PetCertificateComponent } from './certificate/compoments/pet-certificate/pet-certificate.component';
import { VaccineCertificateComponent } from '@app/vis/certificate/compoments/vaccine-certificate/vaccine-certificate.component'; // chanegd By TN
import { AddMassComponent } from './mass/components/add-mass/add-mass.component';
import { AddMedicationComponent } from './individual/components/add-medication/add-medication.component';
import { AddFlashCaseComponent } from './disease-outbreak/components/add-flash-case/add-flash-case.component';
import { FlashDashboadComponent } from './disease-outbreak/components/flash-dashboad/flash-dashboad.component';
import { FlashOutBreakDetailsComponent } from './disease-outbreak/components/flash-out-break-details/flash-out-break-details.component';
import { FollowUpOutBreakDetailsComponent } from './disease-outbreak/components/follow-up-out-break-details/follow-up-out-break-details.component';
import { AddFollowUpCaseComponentComponent } from './disease-outbreak/components/add-follow-up-case-component/add-follow-up-case-component.component';
import { AddmedicationPopOverComponent } from './mass/components/add-mass/addmedication-pop-over/addmedication-pop-over.component';
import { AddmedicationForVaccinationComponent } from './mass/components/add-mass/addmedication-for-vaccination/addmedication-for-vaccination.component';
import { CommonDialogComponent } from './common-dialog/common-dialog.component';
import { PetPrintComponent } from './certificate/compoments/pet-certificate/pet-print/pet-print.component';
import { NgxPrintModule } from 'ngx-print';
import { FollowUpsComponent } from './disease-outbreak/components/follow-ups/follow-ups.component';
import { FollowUpsUsersComponent } from './disease-outbreak/components/follow-ups-users/follow-ups-users.component';
import { FollowUpSusceptibleComponent } from './disease-outbreak/components/follow-up-susceptible/follow-up-susceptible.component';
import { EmailComponentComponent } from './disease-outbreak/components/email-component/email-component.component';
import { EditDataFromAddMoreComponent } from './mass/components/add-mass/edit-data-from-add-more/edit-data-from-add-more.component';
import { ClinicalCertificateComponent } from './individual/components/clinical/clinical-certificate/clinical-certificate.component';
import { PrintTreatmentDetailComponent } from './mass/components/treatment-detail/print-treatment-detail/print-treatment-detail.component';
import { DpmReportComponent } from './Report/components/dpm-report/dpm-report.component';
import { BreederStstusComponent } from './certificate/compoments/breeder-ststus/breeder-ststus.component';
import { MassConfirmationComponent } from './mass/components/mas-registration/mass-confirmation/mass-confirmation.component';
import { PetInfoPrintComponent } from './pet-registration/component/pet-information/pet-info-print/pet-info-print.component';
// import { MapComponent } from './Report/components/map/map.component';
// import { GraphsComponent } from './Report/components/graphs/graphs.component';
import { ReportContainerComponent } from './Report/report-container/report-container.component';
import { ProfileComponent } from './shared/components/profile/profile.component';
import { AddMedicationDewormingComponent } from './individual/components/add-medication-deworming/add-medication-deworming.component';
import { ClinicalForAddNewCaseComponent } from './individual/components/clinical-for-add-new-case/clinical-for-add-new-case.component';
import { TreatmentDetailsPopComponent } from './search/search-results/treatment-details-pop/treatment-details-pop.component';
import { SterilizationDataViewComponent } from './search/search-results/sterilization-data-view/sterilization-data-view.component';
import { DewormingDataViewComponent } from './search/search-results/deworming-data-view/deworming-data-view.component';
import { VaccinationDataViewComponent } from './search/search-results/vaccination-data-view/vaccination-data-view.component';
import { MdvReportComponent } from './Report/components/mdv-report/mdv-report.component';
import { PatientIdPopupComponent } from './individual/components/registration/patient-id-popup/patient-id-popup.component';
import { PetReportComponent } from './Report/components/pet-report/pet-report.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { IndividualSterializationReportComponent } from './report/components/individual-sterialization-report/individual-sterialization-report.component';
import { IndividaulDewormingReportComponent } from './report/components/individaul-deworming-report/individaul-deworming-report.component';
import { IndividaulVaccinationReportComponent } from './report/components/individaul-vaccination-report/individaul-vaccination-report.component';
import { MassSearchComponent } from './mass/components/mass-search/mass-search.component';
import { AddMassCaseComponent } from './mass/components/add-mass-case/add-mass-case.component';
import { AddMassMedComponent } from './mass/components/add-mass-med/add-mass-med.component';
import { AddMassVaccComponent } from './mass/components/add-mass-vacc/add-mass-vacc.component';
import { MassCertificateComponent } from './certificate/components/mass-certificate/mass-certificate.component';
import { MassDewormingReportComponent } from '@app/vis/Report/components/mass-deworming-report/mass-deworming-report.component'; // changes by TN
import { MassVaccinationReportComponent } from './report/components/mass-vaccination-report/mass-vaccination-report.component';
import { OutbreakReportComponent } from './report/components/outbreak-report/outbreak-report.component';
import { IndivClinicalReportComponent } from '@app/vis/Report/components/indiv-clinical-report/indiv-clinical-report.component'; // changed by TN
import { ClinicalFollowupCertificateComponent } from './individual/components/clinical/clinical-followup-certificate/clinical-followup-certificate.component';
import { MassClinincalReportComponent } from '@app/vis/Report/components/mass-clinincal-report/mass-clinincal-report.component'; // changed by TN
import { DataArchivalComponent } from './Report/components/data-archival/data-archival.component';
import { MatIconModule } from '@angular/material/icon';
import { DiseaseOutbreakReportSummaryComponent } from './Report/components/disease-outbreak-report-summary/disease-outbreak-report-summary.component';
import { DiseaseOutbreakReportSearchComponent } from './Report/components/disease-outbreak-report-search/disease-outbreak-report-search.component';
import { RegisterOwnerComponent } from './pet-registration/component/register-owner/register-owner.component';
import { MatDividerModule } from '@angular/material/divider';
@NgModule({
  declarations: [
    RegistrationComponent,
    VisComponent,
    TreatmentComponent,
    PetRegistrationComponent,
    PetRenewalComponent,
    OwnershipTransferComponent,
    PetInformationComponent,
    MassRegistrationComponent,
    MassDogVaccicationComponent,
    DogSterilizationComponent,
    TreatmentDetailComponent,
    FlashReportComponent,
    FollowUpReportComponent,
    EpidemiologyComponent,
    VaccinationComponent,
    DewormingComponent,
    SterilizationComponent,
    ClinicalComponent,
    MassVaccinationComponent,
    MassDewormingComponent,
    VaccinationComponent,
    PoultryCaseComponent,
    OutbreakDetailComponent,
    AddPoultryComponent,
    AddAnimalComponent,
    AddSusceptibleComponent,
    PetHealthCertificateComponent,
    AddFollowUpComponent,
    AddOwnerComponent,
    PetCertificateComponent,
    VaccineCertificateComponent,
    BreederStstusComponent,
    AddMassComponent,
    AddMedicationComponent,
    AddFlashCaseComponent,
    FlashDashboadComponent,
    FlashOutBreakDetailsComponent,
    FollowUpOutBreakDetailsComponent,
    AddFollowUpCaseComponentComponent,
    AddmedicationPopOverComponent,
    AddmedicationForVaccinationComponent,
    CommonDialogComponent,
    PetPrintComponent,
    FollowUpsComponent,
    FollowUpsUsersComponent,
    FollowUpSusceptibleComponent,
    EmailComponentComponent,
    EditDataFromAddMoreComponent,
    ClinicalCertificateComponent,
    PrintTreatmentDetailComponent,
    DpmReportComponent,
    MassConfirmationComponent,
    PetInfoPrintComponent,
    // MapComponent,
    // GraphsComponent,
    ReportContainerComponent,
    ProfileComponent,
    AddMedicationDewormingComponent,
    ClinicalForAddNewCaseComponent,
    TreatmentDetailsPopComponent,
    SterilizationDataViewComponent,
    DewormingDataViewComponent,
    VaccinationDataViewComponent,
    MdvReportComponent,
    PatientIdPopupComponent,
    PetReportComponent,
    IndividualSterializationReportComponent,
    IndividaulDewormingReportComponent,
    IndividaulVaccinationReportComponent,
    MassSearchComponent,
    AddMassCaseComponent,
    AddMassMedComponent,
    AddMassVaccComponent,
    MassCertificateComponent,
    MassDewormingReportComponent,
    MassVaccinationReportComponent,
    OutbreakReportComponent,
    IndivClinicalReportComponent,
    ClinicalFollowupCertificateComponent,
    MassClinincalReportComponent,
    DataArchivalComponent,
    DiseaseOutbreakReportSummaryComponent,
    DiseaseOutbreakReportSearchComponent,
    RegisterOwnerComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    VisRoutingModule,
    ScrollingModule,
    MatTableExporterModule,
    NgxPrintModule,
    MatIconModule,
    MatDividerModule,
  ],

  exports: [
    TreatmentComponent,
    // MapComponent,
    // GraphsComponent,
    ReportContainerComponent,
    DpmReportComponent,
    ClinicalComponent,
    MatTableExporterModule,
    MatIconModule,
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class VisModule {}
