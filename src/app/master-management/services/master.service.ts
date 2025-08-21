import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import {
  AdminRoute,
  AgeGroup,
  AnimalTypes,
  BreedMapping,
  CatchingMethod,
  Class,
  ClinicalTreat,
  Conditions,
  CreateUser,
  Designations,
  DiseaseSampleType,
  FarmingSystem,
  Frequency,
  Laboratory,
  PetRegistration,
  Procedure,
  Reaction,
  Roles,
  SkinCondition,
  Species,
  Tests,
  TypeOfTest,
  VaccineType,
  Breeds,
  Disease,
  UserType,
  UserLevel,
  Centre,
  Jurisdiction,
  System,
  Medicines,
  BasisOfDiagnosis,
  Program,
  DewormingCondition,
  DoseUnit,
  Villages,
  Dzongkhags,
  Gewogs,
  DewormingDiagnosticTest,
  ClinicalDiagnosticTest,
} from '../models/master';
import { RestService } from '@app/master-management/services/rest.service';
import { SearchParams } from '@app/dashboard/models/model';
import { MedicationData } from '@app/vis/shared/model/model';
import { Forgotpassword } from '@app/dashboard/models/forgot-password';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient, private rest: RestService) {}

  // public loadSystemById(id: number): Observable<System> {
  //   return new Observable<System>((observer) => {
  //     this.http.get<System>(`${environment.serverUrl}/species/${id}`, this.httpOptions).subscribe(
  //       (response) => {
  //         observer.next(response);
  //       },
  //       () => observer.error()
  //     );
  //   });
  // }

  public loadSpeciesById(id: number): Observable<Species> {
    return new Observable<Species>((observer) => {
      this.http.get<Species>(`${environment.serverUrl}/system/${id}`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public loadConditions(): Observable<Conditions[]> {
    return new Observable<Conditions[]>((observer) => {
      this.http.get<Conditions[]>(`${environment.serverUrl}/conditions/`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public regCond(speciesId: number): Observable<Conditions[]> {
    return new Observable<Conditions[]>((observer) => {
      this.http.get<Conditions[]>(`${environment.serverUrl}/species/${speciesId}`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public saveSpecies(species: Species) {
    return this.http.post(`${environment.serverUrl}/species/`, species, this.httpOptions);
  }

  public saveSingleSpecies(species: Species) {
    return this.http.post(`${environment.serverUrl}/species/new`, species, this.httpOptions);
  }

  public updateSpecies(species: Species, id: number) {
    return this.http.post(`${environment.serverUrl}/species/${id}/update`, species, this.httpOptions);
  }

  public deleteSpecies(id: number) {
    return this.http.post(`${environment.serverUrl}/species/${id}/delete`, this.httpOptions);
  }

  public loadDewormingCondition(): Observable<DewormingCondition[]> {
    return new Observable<DewormingCondition[]>((observer) => {
      this.http.get<DewormingCondition[]>(`${environment.serverUrl}/dewormingCondition/`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public loadCatchingMethod(): Observable<CatchingMethod[]> {
    return new Observable<CatchingMethod[]>((observer) => {
      this.http.get<CatchingMethod[]>(`${environment.serverUrl}/catch/`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }
  public loadCentre(): Observable<Centre[]> {
    return new Observable<Centre[]>((observer) => {
      this.http.get<Centre[]>(`${environment.serverUrl}/centreAgencies/`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }
  public loadCentreById(id: number): Observable<Centre> {
    return new Observable<Centre>((observer) => {
      this.http.get<Centre>(`${environment.serverUrl}/centreAgencies/${id}`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }
  public saveCentre(centre: Centre) {
    return this.http.post(`${environment.serverUrl}/centreAgencies/`, centre, this.httpOptions);
  }

  public updateCentre(centre: Centre, id: number) {
    return this.http.post(`${environment.serverUrl}/centreAgencies/${id}/update`, centre, this.httpOptions);
  }

  public deleteCentre(id: number) {
    return this.http.post(`${environment.serverUrl}/centreAgencies/${id}/delete`, this.httpOptions);
  }

  public loadCatchingMethodById(id: number): Observable<CatchingMethod> {
    return new Observable<CatchingMethod>((observer) => {
      this.http.get<CatchingMethod>(`${environment.serverUrl}/catch/${id}`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public saveCatchingMethod(catchingMethod: CatchingMethod) {
    return this.http.post(`${environment.serverUrl}/catch/`, catchingMethod, this.httpOptions);
  }

  public updateCatchingMethod(catchingMethod: CatchingMethod, id: number) {
    return this.http.post(`${environment.serverUrl}/catch/${id}/update`, catchingMethod, this.httpOptions);
  }

  public deleteCatchingMethod(id: number) {
    return this.http.post(`${environment.serverUrl}/catch/${id}/delete`, this.httpOptions);
  }

  public loadProgram(): Observable<Program[]> {
    return new Observable<Program[]>((observer) => {
      this.http.get<Program[]>(`${environment.serverUrl}/program/`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public loadProgramById(id: number): Observable<Program> {
    return new Observable<Program>((observer) => {
      this.http.get<Program>(`${environment.serverUrl}/program/${id}`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }
  public saveProgram(program: Program) {
    return this.http.post(`${environment.serverUrl}/program/`, program, this.httpOptions);
  }

  public updateProgram(program: Program, id: number) {
    return this.http.post(`${environment.serverUrl}/program/${id}/update`, program, this.httpOptions);
  }

  public deleteProgram(id: number) {
    return this.http.post(`${environment.serverUrl}/program/${id}/delete`, this.httpOptions);
  }

  // age group servcie
  public loadAgeGroup(): Observable<AgeGroup[]> {
    return new Observable<AgeGroup[]>((observer) => {
      this.http.get<AgeGroup[]>(`${environment.serverUrl}/age/`).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }
  public loadConditionsById(id: number): Observable<Conditions> {
    return new Observable<Conditions>((observer) => {
      this.http.get<Conditions>(`${environment.serverUrl}/conditions/${id}`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }
  public loadAnimalTypesById(id: number): Observable<AnimalTypes> {
    return new Observable<AnimalTypes>((observer) => {
      this.http.get<AnimalTypes>(`${environment.serverUrl}/animaltypes/${id}`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }
  public saveAnimalTypes(animalType: AnimalTypes) {
    return this.http.post(`${environment.serverUrl}/animaltypes/`, animalType, this.httpOptions);
  }

  public updateAnimalTypes(animalType: AnimalTypes, id: number) {
    return this.http.post(`${environment.serverUrl}/animalTypes/${id}/update`, animalType, this.httpOptions);
  }

  public deleteAnimalTypes(id: number) {
    return this.http.post(`${environment.serverUrl}/animaltypes/${id}/delete`, this.httpOptions);
  }

  public saveConditions(conditions: Conditions) {
    return this.http.post(`${environment.serverUrl}/conditions/`, conditions, this.httpOptions);
  }

  public updateConditions(conditions: Conditions, id: number) {
    return this.http.post(`${environment.serverUrl}/conditions/${id}/update`, conditions, this.httpOptions);
  }

  public deleteConditions(id: number) {
    return this.http.post(`${environment.serverUrl}/conditions/${id}/delete`, this.httpOptions);
  }

  public loadAgeGroupById(id: number): Observable<AgeGroup> {
    return new Observable<AgeGroup>((observer) => {
      this.http.get<AgeGroup>(`${environment.serverUrl}/age/${id}`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public saveAgeGroup(ageGroup: AgeGroup) {
    return this.http.post(`${environment.serverUrl}/age/`, ageGroup, this.httpOptions);
  }

  public updateAgeGroup(ageGroup: AgeGroup, id: number) {
    return this.http.post(`${environment.serverUrl}/age/${id}/update`, ageGroup, this.httpOptions);
  }

  public deleteAgeGroup(id: number) {
    return this.http.post(`${environment.serverUrl}/age/${id}/delete`, this.httpOptions);
  }
  //system
  public loadSystem(): Observable<System[]> {
    return new Observable<System[]>((observer) => {
      this.http.get<System[]>(`${environment.serverUrl}/system/`).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }
  public loadSytemById(id: number): Observable<System> {
    return new Observable<System>((observer) => {
      this.http.get<System>(`${environment.serverUrl}/system/${id}`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }
  public loadDeworming(): Observable<DewormingCondition[]> {
    return new Observable<DewormingCondition[]>((observer) => {
      this.http.get<DewormingCondition[]>(`${environment.serverUrl}/dewormingCondition/`).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }
  public loadDewormingById(id: number): Observable<DewormingCondition> {
    return new Observable<DewormingCondition>((observer) => {
      this.http
        .get<DewormingCondition>(`${environment.serverUrl}/dewormingCondition/${id}`, this.httpOptions)
        .subscribe(
          (response) => {
            observer.next(response);
          },
          () => observer.error()
        );
    });
  }
  public loadClinicalDiagnosticTest(): Observable<ClinicalDiagnosticTest[]> {
    return new Observable<ClinicalDiagnosticTest[]>((observer) => {
      this.http.get<ClinicalDiagnosticTest[]>(`${environment.serverUrl}/clinicalDiagnosticTest/`).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }
  public loadClinicalDignosticTestById(id: number): Observable<ClinicalDiagnosticTest> {
    return new Observable<ClinicalDiagnosticTest>((observer) => {
      this.http
        .get<ClinicalDiagnosticTest>(`${environment.serverUrl}/clinicalDiagnosticTest/${id}`, this.httpOptions)
        .subscribe(
          (response) => {
            observer.next(response);
          },
          () => observer.error()
        );
    });
  }

  public saveClinicalDiagnosticTest(test: ClinicalDiagnosticTest) {
    return this.http.post(`${environment.serverUrl}/clinicalDiagnosticTest/`, test, this.httpOptions);
  }

  public updateClinicalDiagnosticTest(test: ClinicalDiagnosticTest, id: number) {
    return this.http.post(`${environment.serverUrl}/clinicalDiagnosticTest/${id}/update`, test, this.httpOptions);
  }

  public deleteSystem(id: number) {
    return this.http.post(`${environment.serverUrl}/system/${id}/delete`, this.httpOptions);
  }

  public saveDeworming(test: DewormingCondition) {
    return this.http.post(`${environment.serverUrl}/dewormingCondition/`, test, this.httpOptions);
  }

  public updateDeworming(test: DewormingCondition, id: number) {
    return this.http.post(`${environment.serverUrl}/dewormingCondition/${id}/update`, test, this.httpOptions);
  }

  public deleteDeworming(id: number) {
    return this.http.post(`${environment.serverUrl}/dewormingCondition/${id}/delete`, this.httpOptions);
  }
  public saveSystem(system: System) {
    return this.http.post(`${environment.serverUrl}/system/`, system, this.httpOptions);
  }

  public updateSystem(system: System, id: number) {
    return this.http.post(`${environment.serverUrl}/system/${id}/update`, system, this.httpOptions);
  }

  // sample type

  public loadDiseaseSampleType(): Observable<DiseaseSampleType[]> {
    return new Observable<DiseaseSampleType[]>((observer) => {
      this.http.get<DiseaseSampleType[]>(`${environment.serverUrl}/sampleType/`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public loadDiseaseSampleTypeById(id: number): Observable<DiseaseSampleType> {
    return new Observable<DiseaseSampleType>((observer) => {
      this.http.get<DiseaseSampleType>(`${environment.serverUrl}/sampleType/${id}`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public saveDiseaseSampleType(diseaseSampleType: DiseaseSampleType) {
    return this.http.post(`${environment.serverUrl}/sampleType/`, diseaseSampleType, this.httpOptions);
  }

  public updateDiseaseSampleType(diseaseSampleType: DiseaseSampleType, id: number) {
    return this.http.post(`${environment.serverUrl}/sampleType/${id}/update`, diseaseSampleType, this.httpOptions);
  }

  public deleteDiseaseSampleType(id: number) {
    return this.http.post(`${environment.serverUrl}/sampleType/${id}/delete`, this.httpOptions);
  }
  // breed
  public loadBreeds(): Observable<Breeds[]> {
    return new Observable<Breeds[]>((observer) => {
      this.http.get<Breeds[]>(`${environment.serverUrl}/breed/`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }
  public loadBreedsById(id: number): Observable<Breeds> {
    return new Observable<Breeds>((observer) => {
      this.http.get<Breeds>(`${environment.serverUrl}/breed/${id}`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }
  //medciens
  public loadMedicines(): Observable<Medicines[]> {
    return new Observable<Medicines[]>((observer) => {
      this.http.get<Medicines[]>(`${environment.serverUrl}/medicine/`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }
  public loadMedicinesById(medicineId: number): Observable<Medicines> {
    return new Observable<Medicines>((observer) => {
      this.http.get<Medicines>(`${environment.serverUrl}/medicine/${medicineId}`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }
  // public saveMedicines(medicines: Medicines) {
  //   return this.http.post(`${environment.serverUrl}/medicine/`, medicines, this.httpOptions);
  // }

  public saveMedicines(medicines: Medicines) {
    debugger
    return this.http.post(`${environment.serverUrl}/medicine/`, medicines, this.httpOptions);
  }

  public updateMedicines(medicines: Medicines, id: number) {
    return this.http.post(`${environment.serverUrl}/medicine/${id}/update`, medicines, this.httpOptions);
  }

  public deleteMedicines(id: number) {
    alert("ddd")
    return this.http.post(`${environment.serverUrl}/medicine/${id}/delete`, this.httpOptions);
  }

  public getAnimalPoultryType(): Observable<AnimalTypes[]> {
    return new Observable<AnimalTypes[]>((observer) => {
      this.http.get<AnimalTypes[]>(`${environment.serverUrl}/animaltypes/poultryType`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public saveBreeds(diseaseSampleType: Breeds) {
    return this.http.post(`${environment.serverUrl}/breed/`, diseaseSampleType, this.httpOptions);
  }

  public updateBreeds(diseaseSampleType: Breeds, id: number) {
    return this.http.post(`${environment.serverUrl}/breed/${id}/update`, diseaseSampleType, this.httpOptions);
  }

  public deleteBreeds(id: number) {
    return this.http.post(`${environment.serverUrl}/breed/${id}/delete`, this.httpOptions);
  }
  // vaccinetyper
  public loadVaccineType(): Observable<VaccineType[]> {
    return new Observable<VaccineType[]>((observer) => {
      this.http.get<VaccineType[]>(`${environment.serverUrl}/vaccine/`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public getMedication(registrationId: number): Observable<MedicationData[]> {
    return new Observable<MedicationData[]>((observer) => {
      this.http
        .get<MedicationData[]>(
          `${environment.serverUrl}/registration/${registrationId}/getMedication`,
          this.httpOptions
        )
        .subscribe(
          (response) => {
            observer.next(response);
          },
          () => observer.error()
        );
    });
  }

  public getMedicationCaseWise(
    registrationId: number,
    caseId: number,
    treatment: string
  ): Observable<MedicationData[]> {
    return new Observable<MedicationData[]>((observer) => {
      this.http
        .get<MedicationData[]>(
          `${environment.serverUrl}/registration/${registrationId}/${caseId}/${treatment}/getMedicationCaseWise`,
          this.httpOptions
        )
        .subscribe(
          (response) => {
            observer.next(response);
          },
          () => observer.error()
        );
    });
  }

  public getMedicationFollowup(registrationId: number): Observable<MedicationData[]> {
    return new Observable<MedicationData[]>((observer) => {
      this.http
        .get<MedicationData[]>(
          `${environment.serverUrl}/registration/${registrationId}/getMedicationFollowup`,
          this.httpOptions
        )
        .subscribe(
          (response) => {
            observer.next(response);
          },
          () => observer.error()
        );
    });
  }

  public loadVaccineByAnimalType(animalTypeId: number): Observable<VaccineType[]> {
    return new Observable<VaccineType[]>((observer) => {
      this.http.get<VaccineType[]>(`${environment.serverUrl}/vaccine/${animalTypeId}`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }
  public loadVaccineTypeById(id: number): Observable<VaccineType> {
    return new Observable<VaccineType>((observer) => {
      this.http.get<VaccineType>(`${environment.serverUrl}/vaccine/${id}`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public saveVaccineType(vaccineType: VaccineType) {
    return this.http.post(`${environment.serverUrl}/vaccine/`, vaccineType, this.httpOptions);
  }

  public updateVaccineType(vaccineType: VaccineType, id: number) {
    return this.http.post(`${environment.serverUrl}/vaccine/${id}/update`, vaccineType, this.httpOptions);
  }

  public deleteVaccineType(id: number) {
    return this.http.post(`${environment.serverUrl}/vaccine/${id}/delete`, this.httpOptions);
  }
  public saveVillages(villages: Villages) {
    return this.http.post(`${environment.serverUrl}/village/`, villages, this.httpOptions);
  }

  public updateVillages(villages: Villages, id: number) {
    return this.http.post(`${environment.serverUrl}/village/${id}/update`, villages, this.httpOptions);
  }

  public deleteVillages(id: number) {
    return this.http.post(`${environment.serverUrl}/village/${id}/delete`, this.httpOptions);
  }

  // Labpratory service start here
  public loadLaboratory(): Observable<Laboratory[]> {
    return new Observable<Laboratory[]>((observer) => {
      this.http.get<Laboratory[]>(`${environment.serverUrl}/lab/`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }
  public loadLoboratoryById(id: number): Observable<Laboratory> {
    return new Observable<Laboratory>((observer) => {
      this.http.get<Laboratory>(`${environment.serverUrl}/lab/${id}`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }
  public saveLaboratory(laboratory: Laboratory) {
    return this.http.post(`${environment.serverUrl}/lab/`, laboratory, this.httpOptions);
  }

  public updateLaboratory(laboratory: Laboratory, id: number) {
    return this.http.post(`${environment.serverUrl}/lab/${id}/update`, laboratory, this.httpOptions);
  }

  public deleteLaboratory(id: number) {
    return this.http.post(`${environment.serverUrl}/lab/${id}/delete`, this.httpOptions);
  }

  public loadDisease(): Observable<Disease[]> {
    return new Observable<Disease[]>((observer) => {
      this.http.get<Disease[]>(`${environment.serverUrl}/disease/`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public loadDoseUnit(): Observable<DoseUnit[]> {
    return new Observable<DoseUnit[]>((observer) => {
      this.http.get<DoseUnit[]>(`${environment.serverUrl}/classes/`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }
  // public loadUnitById(): Observable<DoseUnit[]> {
  //   return new Observable<DoseUnit[]>((observer) => {
  //     this.http.get<DoseUnit[]>(`${environment.serverUrl}/lab/${id}`, this.httpOptions).subscribe(
  //       (response) => {
  //         observer.next(response);
  //       },
  //       () => observer.error()
  //     );
  //   });
  // }
  public loadUnitById(id: number): Observable<DoseUnit> {
    return new Observable<DoseUnit>((observer) => {
      this.http.get<DoseUnit>(`${environment.serverUrl}/classes/${id}`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }
  // public loadDesignationById(id: number): Observable<Disease> {
  //   return new Observable<Disease>((observer) => {
  //     this.http.get<Disease>(`${environment.serverUrl}/disease/${id}`, this.httpOptions).subscribe(
  //       (response) => {
  //         observer.next(response);
  //       },
  //       () => observer.error()
  //     );
  //   });
  // }

  public loadDiseaseById(id: number): Observable<Disease> {
    return new Observable<Disease>((observer) => {
      this.http.get<Disease>(`${environment.serverUrl}/disease/${id}`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public saveDoseUnit(doseUnit: DoseUnit) {
    return this.http.post(`${environment.serverUrl}/classes/`, doseUnit, this.httpOptions);
  }

  public saveDisease(disease: Disease) {
    return this.http.post(`${environment.serverUrl}/disease/`, disease, this.httpOptions);
  }

  public updateDisease(disease: Disease, id: number) {
    return this.http.post(`${environment.serverUrl}/disease/${id}/update`, disease, this.httpOptions);
  }

  public updateDoseUnit(doseUnit: DoseUnit, id: number) {
    return this.http.post(`${environment.serverUrl}/classes/${id}/updateDosUnit`, doseUnit, this.httpOptions);
  }

  public deleteDisease(id: number) {
    return this.http.post(`${environment.serverUrl}/disease/${id}/delete`, this.httpOptions);
  }

  // reaction servcice

  public loadReaction(): Observable<Reaction[]> {
    return new Observable<Reaction[]>((observer) => {
      this.http.get<Reaction[]>(`${environment.serverUrl}/reaction/`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }
  public loadReactionById(id: number): Observable<Reaction> {
    return new Observable<Reaction>((observer) => {
      this.http.get<Reaction>(`${environment.serverUrl}/reaction/${id}`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public saveReaction(reaction: Reaction) {
    return this.http.post(`${environment.serverUrl}/reaction/`, reaction, this.httpOptions);
  }

  public updateReaction(reaction: Reaction, id: number) {
    return this.http.post(`${environment.serverUrl}/reaction/${id}/update`, reaction, this.httpOptions);
  }

  public deleteReaction(id: number) {
    return this.http.post(`${environment.serverUrl}/reaction/${id}/delete`, this.httpOptions);
  }

  // test
  public loadTypeOfTest(): Observable<TypeOfTest[]> {
    return new Observable<TypeOfTest[]>((observer) => {
      this.http.get<TypeOfTest[]>(`${environment.serverUrl}/diagnosis/`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }
  public loadTypeOfTestById(id: number): Observable<TypeOfTest> {
    return new Observable<TypeOfTest>((observer) => {
      this.http.get<TypeOfTest>(`${environment.serverUrl}/diagnosis/${id}`, this.httpOptions).subscribe(
        (response) => {
          console.log(response, 'cvcxvcx');

          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public saveTypeOfTest(typeOfTest: TypeOfTest) {
    return this.http.post(`${environment.serverUrl}/diagnosis/`, typeOfTest, this.httpOptions);
  }

  public updateTypeOfTest(typeOfTest: TypeOfTest, id: number) {
    return this.http.post(`${environment.serverUrl}/diagnosis/${id}/update`, typeOfTest, this.httpOptions);
  }

  public deleteTypeOfTest(id: number) {
    return this.http.post(`${environment.serverUrl}/diagnosis/${id}/delete`, this.httpOptions);
  }

  // frmaing system
  public loadFarmingSystem(): Observable<FarmingSystem[]> {
    return new Observable<FarmingSystem[]>((observer) => {
      this.http.get<FarmingSystem[]>(`${environment.serverUrl}/farm/`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public loadFarmingSystemById(id: number): Observable<FarmingSystem> {
    return new Observable<FarmingSystem>((observer) => {
      this.http.get<FarmingSystem>(`${environment.serverUrl}/farm/${id}`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public saveFarmingSystem(farmingSystem: FarmingSystem) {
    return this.http.post(`${environment.serverUrl}/farm/`, farmingSystem, this.httpOptions);
  }

  public updateFarmingSystem(farmingSystem: FarmingSystem, id: number) {
    return this.http.post(`${environment.serverUrl}/farm/${id}/updateFarmSystem`, farmingSystem, this.httpOptions);
  }

  public deleteFarmingSystem(id: number) {
    return this.http.post(`${environment.serverUrl}/farm/${id}/delete`, this.httpOptions);
  }

  public loadClinicalTreat(): Observable<ClinicalTreat[]> {
    return new Observable<ClinicalTreat[]>((observer) => {
      this.http.get<ClinicalTreat[]>(`${environment.serverUrl}/procedures/`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public loadClinicalTreatById(id: number): Observable<ClinicalTreat> {
    return new Observable<ClinicalTreat>((observer) => {
      this.http.get<ClinicalTreat>(`${environment.serverUrl}/procedures/${id}`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  // Users

  public loadUsers(): Observable<CreateUser[]> {
    return new Observable<CreateUser[]>((observer) => {
      this.http.get<CreateUser[]>(`${environment.serverUrl}/userDtls/`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }
  public loadJurisdiction(JurisdictionName: string) {
    return this.http.get<Jurisdiction[]>(`${environment.serverUrl}/${JurisdictionName}/`, this.httpOptions);
  }

  public saveClinicalTreat(clinicalTreat: ClinicalTreat) {
    return this.http.post(`${environment.serverUrl}/procedures/`, clinicalTreat, this.httpOptions);
  }

  public updateClinicalTreat(clinicalTreat: ClinicalTreat, id: number) {
    return this.http.post(`${environment.serverUrl}/procedures/${id}/update`, clinicalTreat, this.httpOptions);
  }

  public deleteClinicalTreat(id: number) {
    return this.http.post(`${environment.serverUrl}/procedures/${id}/delete`, this.httpOptions);
  }

  // test
  public loadClinicalTest(): Observable<BasisOfDiagnosis[]> {
    return new Observable<BasisOfDiagnosis[]>((observer) => {
      this.http.get<BasisOfDiagnosis[]>(`${environment.serverUrl}/cdtests/`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public loadClinicalTestById(id: number): Observable<BasisOfDiagnosis> {
    return new Observable<BasisOfDiagnosis>((observer) => {
      this.http.get<BasisOfDiagnosis>(`${environment.serverUrl}/cdtests/${id}`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public saveClinicalTest(clinicalTest: BasisOfDiagnosis) {
    return this.http.post(`${environment.serverUrl}/cdtests/`, clinicalTest, this.httpOptions);
  }

  public updateClinicalTest(clinicalTest: BasisOfDiagnosis, id: number) {
    return this.http.post(`${environment.serverUrl}/cdtests/${id}/update`, clinicalTest, this.httpOptions);
  }

  public deleteClinicalTest(id: number) {
    return this.http.post(`${environment.serverUrl}/cdtests/${id}/delete`, this.httpOptions);
  }

  // result test
  public loadTest(): Observable<Tests[]> {
    return new Observable<Tests[]>((observer) => {
      this.http.get<Tests[]>(`${environment.serverUrl}/test2/`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public loadTestById(id: number): Observable<Tests> {
    return new Observable<Tests>((observer) => {
      this.http.get<Tests>(`${environment.serverUrl}/test2/${id}`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public saveTest(test: Tests) {
    return this.http.post(`${environment.serverUrl}/test2/`, test, this.httpOptions);
  }

  public updateTest(test: Tests, id: number) {
    return this.http.post(`${environment.serverUrl}/test2/${id}/update`, test, this.httpOptions);
  }

  public deleteTest(id: number) {
    return this.http.post(`${environment.serverUrl}/test2/${id}/delete`, this.httpOptions);
  }

  // freq
  public loadFrequency(): Observable<Frequency[]> {
    return new Observable<Frequency[]>((observer) => {
      this.http.get<Frequency[]>(`${environment.serverUrl}/frequency/`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public getSystem(conditionsId: number) {
    return this.http.get<Conditions>(`${environment.serverUrl}/conditions/${conditionsId}/`, this.httpOptions);

    // return new Observable<System[]>((observer) => {
    //   this.http.get<System[]>(`${environment.serverUrl}/conditions/${conditionsId}`, this.httpOptions).subscribe(
    //     (response) => {
    //       observer.next(response);
    //     },
    //     () => observer.error()
    //   );
    // });
  }

  public loadFrequencyById(id: number): Observable<Frequency> {
    return new Observable<Frequency>((observer) => {
      this.http.get<Frequency>(`${environment.serverUrl}/frequency/${id}`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }
  public loadGewogById(id: number): Observable<Gewogs> {
    return new Observable<Gewogs>((observer) => {
      this.http.get<Gewogs>(`${environment.serverUrl}/gewog/${id}`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }
  public saveFrequency(frequency: Frequency) {
    return this.http.post(`${environment.serverUrl}/frequency/`, frequency, this.httpOptions);
  }

  public updateFrequency(frequency: Frequency, id: number) {
    return this.http.post(`${environment.serverUrl}/frequency/${id}/update`, frequency, this.httpOptions);
  }

  public deleteFrequency(id: number) {
    return this.http.post(`${environment.serverUrl}/frequency/${id}/delete`, this.httpOptions);
  }
  public deleteGewog(id: number) {
    return this.http.post(`${environment.serverUrl}/gewogs/${id}/delete`, this.httpOptions);
  }
  public saveGewog(gewogs: Gewogs) {
    return this.http.post(`${environment.serverUrl}/gewog/`, gewogs, this.httpOptions);
  }

  public updateGewog(gewogs: Gewogs, id: number) {
    return this.http.post(`${environment.serverUrl}/gewog/${id}/update`, gewogs, this.httpOptions);
  }
  // pet reg

  public loadPetRegistration(): Observable<PetRegistration[]> {
    return new Observable<PetRegistration[]>((observer) => {
      this.http.get<PetRegistration[]>(`${environment.serverUrl}/ownershipType/`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public loadPetRegistrationById(id: number): Observable<PetRegistration> {
    return new Observable<PetRegistration>((observer) => {
      this.http.get<PetRegistration>(`${environment.serverUrl}/ownershipType/${id}`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public savePetRegistration(petRegistration: PetRegistration) {
    return this.http.post(`${environment.serverUrl}/ownershipType/`, petRegistration, this.httpOptions);
  }

  public updatePetRegistration(petRegistration: PetRegistration, id: number) {
    return this.http.post(
      `${environment.serverUrl}/ownershipType/${id}/updatePetRegistrationType`,
      petRegistration,
      this.httpOptions
    );
  }

  public deletePetRegistration(id: number) {
    return this.http.post(`${environment.serverUrl}/ownershipType/${id}/delete`, this.httpOptions);
  }

  // breeding

  public loadBreedMapping(): Observable<BreedMapping[]> {
    return new Observable<BreedMapping[]>((observer) => {
      this.http.get<BreedMapping[]>(`${environment.serverUrl}/petbreed/`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public loadRoles(): Observable<Roles[]> {
    return new Observable<Roles[]>((observer) => {
      this.http.get<Roles[]>(`${environment.serverUrl}/role/`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public loadBreedMappingById(id: number): Observable<BreedMapping> {
    return new Observable<BreedMapping>((observer) => {
      this.http.get<BreedMapping>(`${environment.serverUrl}/petbreed/${id}`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public loadDesignations(): Observable<Designations[]> {
    return new Observable<Designations[]>((observer) => {
      this.http.get<Designations[]>(`${environment.serverUrl}/designation/`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public loadDeworningDiagnosticTest(): Observable<DewormingDiagnosticTest[]> {
    return new Observable<DewormingDiagnosticTest[]>((observer) => {
      this.http.get<DewormingDiagnosticTest[]>(`${environment.serverUrl}/dewormTest/`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }
  public loadDewormingDiagnosticTestById(id: number): Observable<DewormingDiagnosticTest> {
    return new Observable<DewormingDiagnosticTest>((observer) => {
      this.http.get<DewormingDiagnosticTest>(`${environment.serverUrl}/dewormTest/${id}`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }
  public loadDesignationById(id: number): Observable<Designations> {
    return new Observable<Designations>((observer) => {
      this.http.get<Designations>(`${environment.serverUrl}/designation/${id}`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }
  public saveDesignation(designation: Designations) {
    return this.http.post(`${environment.serverUrl}/designation/`, designation, this.httpOptions);
  }

  public updateDesgination(designation: Designations, id: number) {
    return this.http.post(`${environment.serverUrl}/designation/${id}/update`, designation, this.httpOptions);
  }

  public deleteDesignation(id: number) {
    return this.http.post(`${environment.serverUrl}/designation/${id}/delete`, this.httpOptions);
  }
  public saveDewormingTest(dewormingTest: DewormingDiagnosticTest) {
    return this.http.post(`${environment.serverUrl}/dewormTest/`, dewormingTest, this.httpOptions);
  }

  public updateDewormingTest(dewormingTest: DewormingDiagnosticTest, id: number) {
    return this.http.post(`${environment.serverUrl}/dewormTest/${id}/update`, dewormingTest, this.httpOptions);
  }

  public deleteDewormingTest(id: number) {
    return this.http.post(`${environment.serverUrl}/dewormTest/${id}/delete`, this.httpOptions);
  }

  public loadUserType(): Observable<UserType[]> {
    return new Observable<UserType[]>((observer) => {
      this.http.get<UserType[]>(`${environment.serverUrl}/userType/`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }
  public loadUserLevel(): Observable<UserLevel[]> {
    return new Observable<UserLevel[]>((observer) => {
      this.http.get<UserLevel[]>(`${environment.serverUrl}/level/`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }
  public getCentres(userLevelId: number): Observable<Centre[]> {
    return new Observable<Centre[]>((observer) => {
      this.http.get<Centre[]>(`${environment.serverUrl}/centre/${userLevelId}/centre`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public loadSpecies(): Observable<Species[]> {
    return new Observable<Species[]>((observer) => {
      this.http.get<Species[]>(`${environment.serverUrl}/species/`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public loadMassSpecies(): Observable<Species[]> {
    return new Observable<Species[]>((observer) => {
      this.http.get<Species[]>(`${environment.serverUrl}/species/`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public saveBreedMapping(breedMapping: BreedMapping) {
    return this.http.post(`${environment.serverUrl}/petbreed/`, breedMapping, this.httpOptions);
  }

  public updateBreedMapping(breedMapping: BreedMapping, id: number) {
    return this.http.post(`${environment.serverUrl}/petbreed/${id}/update`, breedMapping, this.httpOptions);
  }

  public deleteBreedMapping(id: number) {
    debugger;
    return this.http.post(`${environment.serverUrl}/petbreed/${id}/delete`, this.httpOptions);
  }

  // admin
  public loadAdminRoute(): Observable<AdminRoute[]> {
    return new Observable<AdminRoute[]>((observer) => {
      this.http.get<AdminRoute[]>(`${environment.serverUrl}/admin/`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }
  public loadVillages(): Observable<Villages[]> {
    return new Observable<Villages[]>((observer) => {
      this.http.get<Villages[]>(`${environment.serverUrl}/village/`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }
  public loadDzongkhag(): Observable<Dzongkhags[]> {
    return new Observable<Dzongkhags[]>((observer) => {
      this.http.get<Dzongkhags[]>(`${environment.serverUrl}/dzongkhag/`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }
  public loadGewog(): Observable<Gewogs[]> {
    return new Observable<Gewogs[]>((observer) => {
      this.http.get<Gewogs[]>(`${environment.serverUrl}/gewog/`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public loadUserById(id: number): Observable<CreateUser> {
    return new Observable<CreateUser>((observer) => {
   
      this.http.get<CreateUser>(`${environment.serverUrl}/userDtls/${id}`, this.httpOptions).subscribe(
        (response) => {
          console.log("zxzxzxzx")
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }
  public loadVillageById(id: number): Observable<Villages> {
    return new Observable<Villages>((observer) => {
      this.http.get<Villages>(`${environment.serverUrl}/village/${id}`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }
  public getCitizen(cid: number): Observable<CreateUser> {
    debugger
    console.log(cid)
    return new Observable<CreateUser>((observer) => {
      this.http.get<CreateUser>(`${environment.serverUrl}/api/getcitizendetails/${cid}`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  checkMicrochipNumber(microchipNumber: string) {
    return this.http.get(
      `${environment.serverUrl}/petRegistration/${microchipNumber}/microchipNumberExist`,
      this.httpOptions
    );
  }

  getCheckUserExist(cid: number) {
    return this.http.get(`${environment.serverUrl}/userDtls/${cid}/userExist`, this.httpOptions);
  }

  public loadAdminRouteById(id: number): Observable<AdminRoute> {
    return new Observable<AdminRoute>((observer) => {
      this.http.get<AdminRoute>(`${environment.serverUrl}/admin/${id}`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public saveAdminRoute(adminRoute: AdminRoute) {
    return this.http.post(`${environment.serverUrl}/admin/`, adminRoute, this.httpOptions);
  }

  public updateAdminRoute(adminRoute: AdminRoute, id: number) {
    return this.http.post(`${environment.serverUrl}/admin/${id}/update`, adminRoute, this.httpOptions);
  }

  public deleteAdminRoute(id: number) {
    return this.http.post(`${environment.serverUrl}/admin/${id}/delete`, this.httpOptions);
  }

  //class
  public loadClass(): Observable<Class[]> {
    return new Observable<Class[]>((observer) => {
      this.http.get<Class[]>(`${environment.serverUrl}/class/`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }
  public loadClassDeworming(): Observable<Class[]> {
    return new Observable<Class[]>((observer) => {
      this.http.get<Class[]>(`${environment.serverUrl}/class/dewormingMed`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }
  public loadClassById(id: number): Observable<Class> {
    return new Observable<Class>((observer) => {
      this.http.get<Class>(`${environment.serverUrl}/class/${id}`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }
  public saveClass(newClass: Class) {
    return this.http.post(`${environment.serverUrl}/class/`, newClass, this.httpOptions);
  }

  public updateClass(newClass: Class, id: number) {
    return this.http.post(`${environment.serverUrl}/class/${id}/update`, newClass, this.httpOptions);
  }

  public deleteClass(id: number) {
    return this.http.post(`${environment.serverUrl}/class/${id}/delete`, this.httpOptions);
  }

  // skin
  public loadSkinCondition(): Observable<SkinCondition[]> {
    return new Observable<SkinCondition[]>((observer) => {
      this.http.get<SkinCondition[]>(`${environment.serverUrl}/condition/`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public loadSkinConditionById(id: number): Observable<SkinCondition> {
    return new Observable<SkinCondition>((observer) => {
      this.http.get<SkinCondition>(`${environment.serverUrl}/condition/${id}`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public saveSkinCondition(skinCondition: SkinCondition) {
    return this.http.post(`${environment.serverUrl}/condition/`, skinCondition, this.httpOptions);
  }

  public updateSkinCondition(skinCondition: SkinCondition, id: number) {
    return this.http.post(`${environment.serverUrl}/condition/${id}/update`, skinCondition, this.httpOptions);
  }

  public deleteSkinCondition(id: number) {
    return this.http.post(`${environment.serverUrl}/condition/${id}/delete`, this.httpOptions);
  }

  public saveUsers(createUser: CreateUser) {
    return this.http.post(`${environment.serverUrl}/userDtls/`, createUser, this.httpOptions);
  }

  public deleteUser(id: number) {
    return this.http.post(`${environment.serverUrl}/userDtls/${id}/delete`, this.httpOptions);
  }

  public resetPassword(createUser: CreateUser) {
    return this.http.post(`${environment.serverUrl}/userDtls/resetPassword`, createUser, this.httpOptions);
  }

  public loadProcedure(): Observable<Procedure[]> {
    return new Observable<Procedure[]>((observer) => {
      this.http.get<Procedure[]>(`${environment.serverUrl}/procedures/`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  // freq
  // REgistration and pet individual

  public loadAnimalTypes(): Observable<AnimalTypes[]> {
    return new Observable<AnimalTypes[]>((observer) => {
      this.http.get<AnimalTypes[]>(`${environment.serverUrl}/animaltypes/`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }
  public loadAnimalTypesDog(): Observable<AnimalTypes[]> {
    return new Observable<AnimalTypes[]>((observer) => {
      this.http.get<AnimalTypes[]>(`${environment.serverUrl}/animaltypes/dog`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  /**
   * @param search: SearchParams
   * @description this will load search results based on search params
   */
  public searchBy(search: SearchParams) {
    return this.http.post(`${environment.serverUrl}/registration/search/`, search, this.httpOptions);
  }
  public getupdate(search: SearchParams) {
    return this.http.post(`${environment.serverUrl}/registration/search/`, search, this.httpOptions);
  }

  getRegisteredDetails(id: number) {
    return this.http.get(`${environment.serverUrl}/registration/${id}`, this.httpOptions);
  }

  getPatientDetails(patientId: string) {
    return this.http.get(`${environment.serverUrl}/registration/${patientId}/patientDtls`, this.httpOptions);
  }

  getClinicalCaseDetailsByCaseId(id: number) {
    return this.http.get(`${environment.serverUrl}/registration/${id}/clinicalCaseDetailsByCaseId`, this.httpOptions);
  }

  getClinicalCaseDetails(id: number) {
    return this.http.get(`${environment.serverUrl}/registration/${id}/clinicalCaseDetails`, this.httpOptions);
  }

  getClinicalCaseMedDetails(id: number) {
    return this.http.get(`${environment.serverUrl}/registration/${id}/clinicalCaseMedDetails`, this.httpOptions);
  }

  getfollowUpCaseMedDetails(registrationId: number, caseId: number, followCaseId: number) {
    return this.http.get(
      `${environment.serverUrl}/registration/${registrationId}/${caseId}/${followCaseId}/followUpCaseMedDetails`,
      this.httpOptions
    );
  }

  viewClinicalCases(patientId: string) {
    return this.http.get<any[]>(`${environment.serverUrl}/registration/${patientId}/clinicalCases`, this.httpOptions);
  }

  updatePassword(newPassword: any) {
    return this.http.post(`${environment.serverUrl}/userType/update-password/`, newPassword, this.httpOptions);
  }

  checkPassword(newPassword: any) {
    return this.http.post(`${environment.serverUrl}/userType/check-password/`, newPassword, this.httpOptions);
  }

  getUserById(userId: number) {
    return this.http.get(`${environment.serverUrl}/userDtls/user-by-id/${userId}`, this.httpOptions);
  }

  forgotPassword(model: Forgotpassword) {
    return this.http.post(`${environment.serverUrl}/userType/forgot-password`, model, this.httpOptions);
  }

  loadAllUserDetails(userName: string) {
    return this.http.get(`${environment.serverUrl}/userDtls/${userName}/allUserDtls`, this.httpOptions);
  }

  loadUserlocationDetails(userName: string) {
    return this.http.get(`${environment.serverUrl}/userDtls/${userName}/locationDtls`, this.httpOptions);
  }

  deleteUserRole(roleId: number) {
    return this.http.post(`${environment.serverUrl}/userDtls/deleteUserRole/${roleId}`, this.httpOptions);
  }
}
