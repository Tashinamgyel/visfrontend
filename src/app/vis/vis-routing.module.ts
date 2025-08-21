import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { RegistrationComponent } from './individual/components/registration/registration.component';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { VisComponent } from './shared/components/vis.component';
import { PetRegistrationComponent } from './pet-registration/component/pet-registration/pet-registration.component';
import { PetRenewalComponent } from './pet-registration/component/pet-renewal/pet-renewal.component';
import { PetInformationComponent } from './pet-registration/component/pet-information/pet-information.component';
import { OwnershipTransferComponent } from './pet-registration/component/ownership-transfer/ownership-transfer.component';
import { MassDogVaccicationComponent } from './dog-management/components/mass-dog-vaccication/mass-dog-vaccication.component';
import { DogSterilizationComponent } from './dog-management/components/dog-sterilization/dog-sterilization.component';
import { TreatmentComponent } from '@app/vis/individual/components/treatment/treatment.component';
import { SearchComponent } from '@app/vis/search/search/search.component';
import { FlashReportComponent } from '@app/vis/disease-outbreak/components/flash-report/flash-report.component';
import { FollowUpReportComponent } from '@app/vis/disease-outbreak/components/follow-up-report/follow-up-report.component';
import { MassRegistrationComponent } from '@app/vis/mass/components/mas-registration/mass-registration.component';
import { OutbreakDetailComponent } from './disease-outbreak/components/outbreak-detail/outbreak-detail.component';
import { PetCertificateComponent } from './certificate/compoments/pet-certificate/pet-certificate.component';
import { VaccineCertificateComponent } from './certificate/compoments/vaccine-certificate/vaccine-certificate.component';
import { FlashOutBreakDetailsComponent } from './disease-outbreak/components/flash-out-break-details/flash-out-break-details.component';
import { FollowUpOutBreakDetailsComponent } from './disease-outbreak/components/follow-up-out-break-details/follow-up-out-break-details.component';
import { FollowUpsComponent } from './disease-outbreak/components/follow-ups/follow-ups.component';
import { FollowUpsUsersComponent } from './disease-outbreak/components/follow-ups-users/follow-ups-users.component';
import { BreederStstusComponent } from './certificate/compoments/breeder-ststus/breeder-ststus.component';
// import { MapComponent } from './Report/components/map/map.component';
import { ProfileComponent } from './shared/components/profile/profile.component';
import { DpmReportComponent } from './Report/components/dpm-report/dpm-report.component';
import { MdvReportComponent } from './Report/components/mdv-report/mdv-report.component';
import { PetHealthCertificateComponent } from './pet-registration/component/pet-health-certificate/pet-health-certificate.component';
import { PetReportComponent } from './Report/components/pet-report/pet-report.component';
import { MassSearchComponent } from './mass/components/mass-search/mass-search.component';
import { IndividaulDewormingReportComponent } from './report/components/individaul-deworming-report/individaul-deworming-report.component';
import { IndividaulVaccinationReportComponent } from './report/components/individaul-vaccination-report/individaul-vaccination-report.component';
import { IndividualSterializationReportComponent } from './report/components/individual-sterialization-report/individual-sterialization-report.component';
import { MassVaccinationReportComponent } from './report/components/mass-vaccination-report/mass-vaccination-report.component';
import { MassDewormingReportComponent } from './report/components/mass-deworming-report/mass-deworming-report.component';
import { MassClinincalReportComponent } from './Report/components/mass-clinincal-report/mass-clinincal-report.component';
import { OutbreakReportComponent } from './report/components/outbreak-report/outbreak-report.component';
import { IndivClinicalReportComponent } from './Report/components/indiv-clinical-report/indiv-clinical-report.component';
import { MassCertificateComponent } from './certificate/components/mass-certificate/mass-certificate.component';
import { DataArchivalComponent } from './Report/components/data-archival/data-archival.component';
import { DiseaseOutbreakReportSummaryComponent } from './Report/components/disease-outbreak-report-summary/disease-outbreak-report-summary.component';
import { DiseaseOutbreakReportSearchComponent } from './Report/components/disease-outbreak-report-search/disease-outbreak-report-search.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/vis', pathMatch: 'full' },
    { path: 'vis', component: VisComponent, data: { title: marker('vis') } },
    { path: 'registration', component: RegistrationComponent, data: { title: marker(' Patient Registration') } },
    { path: 'treatment+category', component: TreatmentComponent, data: { title: marker('Treatment') } },
    { path: 'search', component: SearchComponent, data: { title: marker(' Patient Search') } },
    { path: 'petregistration', component: PetRegistrationComponent, data: { title: marker('Pet Registration') } },
    { path: 'petrenewal', component: PetRenewalComponent, data: { title: marker('Pet Renewal & Info Update') } },
    { path: 'petinformation', component: PetInformationComponent, data: { title: marker('Pet Information') } },
    { path: 'ownertransfer', component: OwnershipTransferComponent, data: { title: marker('Ownership Transfer') } },
    //{ path: 'mass/:clickedData', component: MassRegistrationComponent, data: { title: marker('mass registration') } },
    { path: 'mass', component: MassRegistrationComponent, data: { title: marker('Mass Registration') } },
    { path: 'massSearch', component: MassSearchComponent, data: { title: marker('Mass Search') } },
    { path: 'dogVaccination', component: MassDogVaccicationComponent, data: { title: marker('Mass Dog Vaccination') } },
    {
      path: 'dogSterilization',
      component: DogSterilizationComponent,
      data: { title: marker('Dog Population Management') },
    },
    { path: 'flashReport', component: FlashReportComponent, data: { title: marker('Flash') } },
    { path: 'followUp', component: FollowUpReportComponent, data: { title: marker('Follow up') } },
    { path: 'outbreakDetails', component: OutbreakDetailComponent, data: { title: marker('Outbreak Details') } },
    { path: 'petCertificate', component: PetCertificateComponent, data: { title: marker('Pet Certificate') } },
    {
      path: 'vaccineCertificate',
      component: VaccineCertificateComponent,
      data: { title: marker('Vaccine Certificate') },
    },
    { path: 'breeder', component: BreederStstusComponent, data: { title: marker('Breeder Statement') } },
    { path: 'breeder', component: BreederStstusComponent, data: { title: marker('Breeder Statement') } },
    { path: 'reports', component: DpmReportComponent, data: { title: marker(' DPM Report') } },
    { path: 'reportsMdv', component: MdvReportComponent, data: { title: marker('MDV Report') } },
    // { path: 'map', component: MapComponent, data: { title: marker('Report') } },
    { path: 'profile', component: ProfileComponent, data: { title: marker('User Profile') } },
    { path: 'petHealth', component: PetHealthCertificateComponent, data: { title: marker('Pet Health Certificatte') } },
    { path: 'petReport', component: PetReportComponent, data: { title: marker('Pet Information Report') } },
    {
      path: 'individualDewormingReport',
      component: IndividaulDewormingReportComponent,
      data: { title: marker('Individual Deworming Report') },
    },
    {
      path: 'individualVaccinationReport',
      component: IndividaulVaccinationReportComponent,
      data: { title: marker('Individual Vaccination Report') },
    },
    {
      path: 'individualClinicalReport',
      component: IndivClinicalReportComponent,
      data: { title: marker('Individual Clinical Report') },
    },
    {
      path: 'massVaccinationReport',
      component: MassVaccinationReportComponent,
      data: { title: marker('Mass Vaccination Report') },
    },

    {
      path: 'massDewormingReport',
      component: MassDewormingReportComponent,
      data: { title: marker('Mass Deworming Report') },
    },

    {
      path: 'massClinicalReport',
      component: MassClinincalReportComponent,
      data: { title: marker('Mass Clinical Report') },
    },
    { path: 'outbreakReport', component: OutbreakReportComponent, data: { title: marker('Disease Outbreak Report') } },

    {
      path: 'individualSterlizationReport',
      component: IndividualSterializationReportComponent,
      data: { title: marker('Individual Sterilization Report') },
    },
    {
      path: 'massCertificate',
      component: MassCertificateComponent,
      data: { title: marker('Mass Certificate') },
    },

    {
      path: 'flashOutbreakDetails',
      component: FlashOutBreakDetailsComponent,
      data: { title: marker('Flash Outbreak Details') },
    },
    {
      path: 'diseaseOutbreakReportSeach',
      component: DiseaseOutbreakReportSearchComponent,
      data: { title: marker('Disease Outbreak Report search By Id') },
    },
    {
      path: 'followUpOutbreakDetails',
      component: FollowUpOutBreakDetailsComponent,
      data: { title: marker('Flash Outbreak Details') },
    },
    {
      path: 'diseaseOutbreakReportSummaryComponent',
      component: DiseaseOutbreakReportSummaryComponent,
      data: { title: marker('Disease Outbreak Report Summary') },
    },
    { path: 'followUps', component: FollowUpsComponent, data: { title: marker('follow Up') } },
    { path: 'followUpsUsers', component: FollowUpsUsersComponent, data: { title: marker('followUp Users') } },
    { path: 'dataArchival', component: DataArchivalComponent, data: { title: marker('Data Archival') } },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisRoutingModule {}
