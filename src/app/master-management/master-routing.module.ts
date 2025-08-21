import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { MasterComponent } from './container/master/master.component';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { SpeciesComponent } from './components/species/species.component';
import { CatchingMethodListComponent } from './components/catching-method-list/catching-method-list.component';
import { AgeGroupListComponent } from './components/age-group-list/age-group-list.component';
import { SampleTypeListComponent } from './components/sample-type-list/sample-type-list.component';
import { LaboratoryListComponent } from './components/laboratory-list/laboratory-list.component';
import { ReactionListComponent } from './components/reaction-list/reaction-list.component';
import { TestTypeListComponent } from './components/test-type-list/test-type-list.component';
import { FarmingSystemListComponent } from './components/farming-system-list/farming-system-list.component';
import { ClinicalTreatmentListComponent } from './components/clinical-treatment-list/clinical-treatment-list.component';
import { ClinicalTestListComponent } from './components/clinical-test-list/clinical-test-list.component';
import { TestResultListComponent } from './components/test-result-list/test-result-list.component';
import { PetRegisterTypeListComponent } from './components/pet-register-type-list/pet-register-type-list.component';
import { BreedListComponent } from './components/breed-list/breed-list.component';
import { AdminRouteListComponent } from './components/admin-route-list/admin-route-list.component';
import { SkinConditionListComponent } from './components/skin-condition-list/skin-condition-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { VaccineTypeListComponent } from './components/vaccine-type-list/vaccine-type-list.component';
import { FrequencyListComponent } from './components/frequency-list/frequency-list.component';
import { GeneralBreedListComponent } from './components/general-breed-list/general-breed-list.component';
import { DiseaseListComponent } from '@app/master-management/components/disease-list/disease-list.component';
import { SystemListComponent } from './components/system-list/system-list.component';
import { ConditionsListComponent } from './components/conditions-list/conditions-list.component';
import { ClassListComponent } from './components/class-list/class-list.component';
import { MedicinesListComponent } from './components/medicines-list/medicines-list.component';
import { AnimalTypeListComponent } from './components/animal-type-list/animal-type-list.component';
import { ProgramComponent } from './components/program/program.component';
import { DoseUnitListComponent } from './components/dose-unit-list/dose-unit-list.component';
import { DesignationListComponent } from './components/designation-list/designation-list.component';
import { CentreListComponent } from './components/centre-list/centre-list.component';
import { VillagelistComponent } from './components/villagelist/villagelist.component';
import { DeworwmingDiagnosticTestListComponent } from './components/deworwming-diagnostic-test-list/deworwming-diagnostic-test-list.component';
import { ClinicalDiagnosticTestListComponent } from './components/clinical-diagnostic-test-list/clinical-diagnostic-test-list.component';
import { GewogComponent } from './components/gewog/gewog.component';
import { DewormConditionListComponent } from './components/deworm-condition-list/deworm-condition-list.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/master-management', pathMatch: 'full' },
    { path: 'master-management', component: MasterComponent, data: { title: marker('Master') } },
    { path: 'species', component: SpeciesComponent, data: { title: marker('Species') } },
    { path: 'catchingMethod', component: CatchingMethodListComponent, data: { title: marker('Catching Method') } },
    { path: 'ageGroup', component: AgeGroupListComponent, data: { title: marker('AgeGroup') } },
    { path: 'diseaseSampleType', component: SampleTypeListComponent, data: { title: marker('Disease Sample Type') } },
    { path: 'laboratory', component: LaboratoryListComponent, data: { title: marker('Laboratory') } },
    { path: 'reaction', component: ReactionListComponent, data: { title: marker('Reaction') } },
    { path: 'typeOfTest', component: TestTypeListComponent, data: { title: marker('Type  of Test') } },
    { path: 'farming', component: FarmingSystemListComponent, data: { title: marker('Farming System') } },
    { path: 'clinicalTreat', component: ClinicalTreatmentListComponent, data: { title: marker('Clinical Treatment') } },
    { path: 'clinicalTest', component: ClinicalTestListComponent, data: { title: marker('Clinical Test') } },
    { path: 'testResult', component: TestResultListComponent, data: { title: marker('Test Result') } },
    {
      path: 'pRegistrationtype',
      component: PetRegisterTypeListComponent,
      data: { title: marker('Animal Ownership Type') },
    },
    { path: 'breedMapping', component: BreedListComponent, data: { title: marker(' Pet Breed') } },
    { path: 'adminRoute', component: AdminRouteListComponent, data: { title: marker('Route of Admin') } },
    { path: 'skinCondition', component: SkinConditionListComponent, data: { title: marker('Skin Conditions') } },
    { path: 'createUser', component: UserListComponent, data: { title: marker('Create User') } },
    { path: 'vaccineType', component: VaccineTypeListComponent, data: { title: marker('Vaccine Type') } },
    { path: 'frequency', component: FrequencyListComponent, data: { title: marker('Frequency') } },
    { path: 'breed', component: GeneralBreedListComponent, data: { title: marker('Breed') } },
    { path: 'disease', component: DiseaseListComponent, data: { title: marker('Disease') } },
    { path: 'system', component: SystemListComponent, data: { title: marker('System') } },
    { path: 'conditions', component: ConditionsListComponent, data: { title: marker('Condition') } },
    { path: 'class', component: ClassListComponent, data: { title: marker('class') } },
    { path: 'Medicines', component: MedicinesListComponent, data: { title: marker('Medicines') } },
    { path: 'animal', component: AnimalTypeListComponent, data: { title: marker('Animal') } },
    { path: 'program', component: ProgramComponent, data: { title: marker('Program') } },
    { path: 'doseUnit', component: DoseUnitListComponent, data: { title: marker('Unit Dose') } },
    { path: 'designation', component: DesignationListComponent, data: { title: marker('Designation') } },
    { path: 'centre', component: CentreListComponent, data: { title: marker('Centre') } },
    { path: 'village', component: VillagelistComponent, data: { title: marker('village') } },
    {
      path: 'dewormingTest',
      component: DeworwmingDiagnosticTestListComponent,
      data: { title: marker('Deworming Diagnostic Test') },
    },
    {
      path: 'deCondition',
      component: DewormConditionListComponent,
      data: { title: marker('DewormingCondition') },
    },
    {
      path: 'clinicalDiagnosticTest',
      component: ClinicalDiagnosticTestListComponent,
      data: { title: marker('CLinical Diagnostic Test') },
    },
    { path: 'gewogs', component: GewogComponent, data: { title: marker('Gewog') } },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterRoutingModule {}
