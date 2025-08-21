import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { MasterComponent } from './container/master/master.component';
import { SpeciesComponent } from './components/species/species.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/@shared';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';
import { SpeciesFormComponent } from './components/species-form/species-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CatchingMethodFormComponent } from './components/catching-method-form/catching-method-form.component';
import { CatchingMethodListComponent } from './components/catching-method-list/catching-method-list.component';
import { AgeGroupListComponent } from './components/age-group-list/age-group-list.component';
import { AgeGroupFormComponent } from './components/age-group-form/age-group-form.component';
import { SampleTypeListComponent } from './components/sample-type-list/sample-type-list.component';
import { SampleTypeFormComponent } from './components/sample-type-form/sample-type-form.component';
import { LaboratoryListComponent } from './components/laboratory-list/laboratory-list.component';
import { LaboratoryFormComponent } from './components/laboratory-form/laboratory-form.component';
import { ReactionListComponent } from './components/reaction-list/reaction-list.component';
import { ReactionFormComponent } from './components/reaction-form/reaction-form.component';
import { TestTypeListComponent } from './components/test-type-list/test-type-list.component';
import { TestTypeFormComponent } from './components/test-type-form/test-type-form.component';
import { FarmingSystemListComponent } from './components/farming-system-list/farming-system-list.component';
import { FarmingSystemFormComponent } from './components/farming-system-form/farming-system-form.component';
import { ClinicalTreatmentListComponent } from './components/clinical-treatment-list/clinical-treatment-list.component';
import { ClinicalTreatmentFormComponent } from './components/clinical-treatment-form/clinical-treatment-form.component';
import { ClinicalTestListComponent } from './components/clinical-test-list/clinical-test-list.component';
import { ClinicalTestFormComponent } from './components/clinical-test-form/clinical-test-form.component';
import { TestResultListComponent } from './components/test-result-list/test-result-list.component';
import { TestResultFormComponent } from './components/test-result-form/test-result-form.component';
import { PetRegisterTypeListComponent } from './components/pet-register-type-list/pet-register-type-list.component';
import { PetRegisterTypeFormComponent } from './components/pet-register-type-form/pet-register-type-form.component';
import { BreedListComponent } from './components/breed-list/breed-list.component';
import { BreedFormComponent } from './components/breed-form/breed-form.component';
import { AdminRouteFormComponent } from './components/admin-route-form/admin-route-form.component';
import { AdminRouteListComponent } from './components/admin-route-list/admin-route-list.component';
import { SkinConditionListComponent } from './components/skin-condition-list/skin-condition-list.component';
import { SkinConditionFormComponent } from './components/skin-condition-form/skin-condition-form.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { VaccineTypeFormComponent } from './components/vaccine-type-form/vaccine-type-form.component';
import { VaccineTypeListComponent } from './components/vaccine-type-list/vaccine-type-list.component';
import { FrequencyFOrmComponent } from './components/frequency-form/frequency-form.component';
import { FrequencyListComponent } from './components/frequency-list/frequency-list.component';
import { GeneralBreedFormComponent } from './components/general-breed-form/general-breed-form.component';
import { GeneralBreedListComponent } from './components/general-breed-list/general-breed-list.component';
import { DiseaseFormComponent } from './components/disease-form/disease-form.component';
import { DiseaseListComponent } from './components/disease-list/disease-list.component';
import { SystemListComponent } from './components/system-list/system-list.component';
import { SystemFormComponent } from './components/system-form/system-form.component';
import { ConditionsListComponent } from './components/conditions-list/conditions-list.component';
import { ConditionsFormComponent } from './components/conditions-form/conditions-form.component';
import { AnimalTypeListComponent } from './components/animal-type-list/animal-type-list.component';
import { AnimalTypeFormComponent } from './components/animal-type-form/animal-type-form.component';
import { ClassListComponent } from './components/class-list/class-list.component';
import { ClassFormComponent } from './components/class-form/class-form.component';
import { MedicinesListComponent } from './components/medicines-list/medicines-list.component';
import { MedicinesFormComponent } from './components/medicines-form/medicines-form.component';
import { ProgramComponent } from './components/program/program.component';
import { ProgramFormComponent } from './components/program-form/program-form.component';
import { DoseUnitComponent } from './components/dose-unit/dose-unit.component';
import { DoseUnitListComponent } from './components/dose-unit-list/dose-unit-list.component';
import { DesignationListComponent } from './components/designation-list/designation-list.component';
import { DesignationFormComponent } from './components/designation-form/designation-form.component';

import { CentreListComponent } from './components/centre-list/centre-list.component';
import { centreFormComponent } from './components/centre-form/centre-form.component';
import { VillageformComponent } from './components/villageform/villageform.component';
import { VillagelistComponent } from './components/villagelist/villagelist.component';
import { DeworwmingDiagnosticTestFormComponent } from './components/deworwming-diagnostic-test-form/deworwming-diagnostic-test-form.component';
import { DeworwmingDiagnosticTestListComponent } from './components/deworwming-diagnostic-test-list/deworwming-diagnostic-test-list.component';
import { ClinicalDiagnosticTestFormComponent } from './components/clinical-diagnostic-test-form/clinical-diagnostic-test-form.component';
import { ClinicalDiagnosticTestListComponent } from './components/clinical-diagnostic-test-list/clinical-diagnostic-test-list.component';
import { GewogComponent } from './components/gewog/gewog.component';
import { GewogFormComponent } from './components/gewog-form/gewog-form.component';
import { DewormConditionFormComponent } from './components/deworm-condition-form/deworm-condition-form.component';
import { DewormConditionListComponent } from './components/deworm-condition-list/deworm-condition-list.component';

@NgModule({
  declarations: [
    MasterComponent,
    SpeciesComponent,
    SpeciesFormComponent,
    CatchingMethodFormComponent,
    CatchingMethodListComponent,
    AgeGroupListComponent,
    AgeGroupFormComponent,
    SampleTypeListComponent,
    SampleTypeFormComponent,
    LaboratoryListComponent,
    LaboratoryFormComponent,
    ReactionListComponent,
    ReactionFormComponent,
    TestTypeListComponent,
    TestTypeFormComponent,
    FarmingSystemListComponent,
    FarmingSystemFormComponent,
    ClinicalTreatmentListComponent,
    ClinicalTreatmentFormComponent,
    ClinicalTestListComponent,
    ClinicalTestFormComponent,
    TestResultListComponent,
    TestResultFormComponent,
    PetRegisterTypeListComponent,
    PetRegisterTypeFormComponent,
    BreedListComponent,
    BreedFormComponent,
    AdminRouteFormComponent,
    AdminRouteListComponent,
    SkinConditionListComponent,
    SkinConditionFormComponent,
    CreateUserComponent,
    UserListComponent,
    VaccineTypeFormComponent,
    VaccineTypeListComponent,
    FrequencyListComponent,
    FrequencyFOrmComponent,
    GeneralBreedFormComponent,
    GeneralBreedListComponent,
    DiseaseFormComponent,
    DiseaseListComponent,
    SystemListComponent,
    SystemFormComponent,
    ConditionsListComponent,
    ConditionsFormComponent,
    AnimalTypeListComponent,
    AnimalTypeFormComponent,
    ClassListComponent,
    ClassFormComponent,
    MedicinesListComponent,
    MedicinesFormComponent,
    ProgramComponent,
    ProgramFormComponent,
    DoseUnitComponent,
    DoseUnitListComponent,
    DesignationListComponent,
    DesignationFormComponent,
    centreFormComponent,
    CentreListComponent,
    VillageformComponent,
    VillagelistComponent,
    DeworwmingDiagnosticTestFormComponent,
    DeworwmingDiagnosticTestListComponent,
    ClinicalDiagnosticTestFormComponent,
    ClinicalDiagnosticTestListComponent,
    GewogComponent,
    GewogFormComponent,

    DesignationListComponent,

    DewormConditionFormComponent,

    DewormConditionListComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MasterRoutingModule,
  ],
})
export class MasterModule {}
