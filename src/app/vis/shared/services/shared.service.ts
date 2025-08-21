import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {
  Clinical,
  DogRegistration,
  DogSterilization,
  FlashReport,
  MassData,
  MassDogVaccination,
  PetRegistration,
  Registration,
  RegistrationId,
  FlashId,
  CaseData,
  MedicationData,
  PetRenwal,
  VisReport,
  ReportRequest,
  FlashEmailList,
  EmailData,
  // Country,
} from '../model/model';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import {
  Dzongkhags,
  Gewogs,
  Disease,
  Medicines,
  OwnershipTypes,
  Species,
  AnimalTypes,
  Breeds,
  PetBreeds,
  Cases,
  ClinicalDetails,
  VaccineType,
  Villages,
  Conditions,
  Country,
  SearchDetails,
  MassSearch,
  MedClass,
} from '@app/master-management/models/master';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  Savedid: RegistrationId;
  SaveOutBreakdid: FlashId;
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  public populateflashList(userName: string, roleName: string, actionType: string) {
    return this.http.get<any[]>(
      `${environment.serverUrl}/flash/${userName}/${roleName}/${actionType}/taskList`,
      this.httpOptions
    );
  }

  public populateClincalDetail(clinicalDetail: number): Observable<ClinicalDetails[]> {
    return new Observable<ClinicalDetails[]>((observer) => {
      this.http
        .get<ClinicalDetails[]>(`${environment.serverUrl}/petRegistration/clinicalDetail`, this.httpOptions)
        .subscribe(
          (response) => {
            console.log(response);
            observer.next(response);
          },
          () => observer.error()
        );
    });
  }

  getClinicalDetail(clinicalDetailId: number) {
    return this.http.get<any>(
      `${environment.serverUrl}/registration/clinicalDetail/${clinicalDetailId}`,
      this.httpOptions
    );
  }
  getOutbreakDetails(flashId: number) {
    return this.http.get<any>(`${environment.serverUrl}/flash/${flashId}`, this.httpOptions);
  }

  getfollowUpDetails(flashId: number, reportStatus: number) {
    return this.http.get<any>(
      `${environment.serverUrl}/flash/${flashId}/${reportStatus}/followUpDtls`,
      this.httpOptions
    );
  }

  getCaseDetails(flashId: number) {
    return this.http.get<any>(`${environment.serverUrl}/flash/${flashId}/flashCase`, this.httpOptions);
  }
  getSusceptibleData(flashId: number) {
    return this.http.get<any>(`${environment.serverUrl}/flash/${flashId}/susceptible`, this.httpOptions);
  }

  getFollowUpCaseDetails(flashId: number, type: string, reportStatus: number, cid: number) {
    console.log('ddddddddd', flashId);
    return this.http.get<any>(
      `${environment.serverUrl}/flash/${flashId}/${type}/${reportStatus}/${cid}/followUpCaseDetails`,
      this.httpOptions
    );
  }

  loadEmail() {
    return this.http.get<any>(`${environment.serverUrl}/flash/email`, this.httpOptions);
  }

  getFlashCase(createdBy: string, type: string) {
    return this.http.get<any[]>(`${environment.serverUrl}/flash/${createdBy}/${type}/flashCase`, this.httpOptions);
  }

  getFlashSusceptibleData(createdBy: string) {
    return this.http.get<any[]>(`${environment.serverUrl}/flash/${createdBy}/flashSusceptible`, this.httpOptions);
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

  public getGewogs(dzongkhagId: number): Observable<Gewogs[]> {
    return new Observable<Gewogs[]>((observer) => {
      this.http
        .get<Gewogs[]>(`${environment.serverUrl}/gewog/${dzongkhagId}/gewogsByDzoId`, this.httpOptions)
        .subscribe(
          (response) => {
            observer.next(response);
          },
          () => observer.error()
        );
    });
  }
  public getVillage(gewogId: number): Observable<Villages[]> {
    return new Observable<Villages[]>((observer) => {
      this.http
        .get<Villages[]>(`${environment.serverUrl}/village/${gewogId}/villageByGewogId`, this.httpOptions)
        .subscribe(
          (response) => {
            observer.next(response);
          },
          () => observer.error()
        );
    });
  }

  public getNotifiability(diseaseId: number) {
    return this.http.get<Disease>(`${environment.serverUrl}/disease/${diseaseId}/`, this.httpOptions);
  }

  public getMedicine(classId: number): Observable<Medicines[]> {
    return new Observable<Medicines[]>((observer) => {
      this.http
        .get<Medicines[]>(`${environment.serverUrl}/medicine/${classId}/listMedicine`, this.httpOptions)
        .subscribe(
          (response) => {
            observer.next(response);
          },
          () => observer.error()
        );
    });
  }

  public getMedicines(classId: number): Observable<MedClass[]> {
    debugger;
    return new Observable<MedClass[]>((observer) => {
      this.http
        .get<MedClass[]>(`${environment.serverUrl}/medClass/${classId}/petBreedBySpecies`, this.httpOptions)
        .subscribe(
          (response) => {
            observer.next(response);
          },
          () => observer.error()
        );
    });
  }

  public getConditions(systemId: number): Observable<Conditions[]> {
    return new Observable<Conditions[]>((observer) => {
      this.http
        .get<Conditions[]>(`${environment.serverUrl}/conditions/${systemId}/conditionList`, this.httpOptions)
        .subscribe(
          (response) => {
            observer.next(response);
          },
          () => observer.error()
        );
    });
  }

  public getMedicineDetails(medicineId: number): Observable<Medicines> {
    return new Observable<Medicines>((observer) => {
      this.http.get<Medicines>(`${environment.serverUrl}/medicine/${medicineId}`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }
  public getFollowUpDetail(): Observable<ClinicalDetails> {
    return new Observable<ClinicalDetails>((observer) => {
      this.http.get<ClinicalDetails>(`${environment.serverUrl}/registration/clinical`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public getAnimalType(speciesId: number): Observable<AnimalTypes[]> {
    return new Observable<AnimalTypes[]>((observer) => {
      this.http
        .get<AnimalTypes[]>(`${environment.serverUrl}/animaltypes/${speciesId}/animalTypesBySpecies`, this.httpOptions)
        .subscribe(
          (response) => {
            observer.next(response);
          },
          () => observer.error()
        );
    });
  }

  public loadOwnershipType(): Observable<OwnershipTypes[]> {
    return new Observable<OwnershipTypes[]>((observer) => {
      this.http.get<OwnershipTypes[]>(`${environment.serverUrl}/ownershipType/`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public loadDiseases(): Observable<Disease[]> {
    return new Observable<Disease[]>((observer) => {
      this.http.get<Disease[]>(`${environment.serverUrl}/disease/`, this.httpOptions).subscribe(
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

  public loadDogSpecies(): Observable<Species[]> {
    return new Observable<Species[]>((observer) => {
      this.http.get<Species[]>(`${environment.serverUrl}/species/dogSpecies`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public loadCatSpecies(): Observable<Species[]> {
    return new Observable<Species[]>((observer) => {
      this.http.get<Species[]>(`${environment.serverUrl}/species/catSpecies`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public getAnimalTypes(speciesId: number): Observable<AnimalTypes[]> {
    return new Observable<AnimalTypes[]>((observer) => {
      this.http
        .get<AnimalTypes[]>(`${environment.serverUrl}/animaltypes/${speciesId}/animalTypesBySpecies`, this.httpOptions)
        .subscribe(
          (response) => {
            observer.next(response);
          },
          () => observer.error()
        );
    });
  }

  public getVaccineType(id: number): Observable<VaccineType[]> {
    return new Observable<VaccineType[]>((observer) => {
      this.http.get<VaccineType[]>(`${environment.serverUrl}/vaccine/${id}`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

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

  public loadPetBreeds(): Observable<PetBreeds[]> {
    return new Observable<PetBreeds[]>((observer) => {
      this.http.get<PetBreeds[]>(`${environment.serverUrl}/petbreed/`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public loadMedcineDetails(): Observable<Medicines[]> {
    return new Observable<Medicines[]>((observer) => {
      this.http.get<Medicines[]>(`${environment.serverUrl}/medDetails/`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public loadMedcineClassDetails(): Observable<MedClass[]> {
    return new Observable<MedClass[]>((observer) => {
      this.http.get<MedClass[]>(`${environment.serverUrl}/medClass/`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public getPetBreeds(speciesId: number): Observable<PetBreeds[]> {
    return new Observable<PetBreeds[]>((observer) => {
      this.http
        .get<PetBreeds[]>(`${environment.serverUrl}/petbreed/${speciesId}/petBreedBySpecies`, this.httpOptions)
        .subscribe(
          (response) => {
            observer.next(response);
          },
          () => observer.error()
        );
    });
  }

  public saveRegistration(registration: Registration) {
    return this.http.post(`${environment.serverUrl}/registration/`, registration, this.httpOptions);
  }
  public sendMail(emailData: EmailData) {
    console.log('thissss', emailData);
    return this.http.post(`${environment.serverUrl}/flash/sendEmail`, emailData, this.httpOptions);
  }

  registrationId(id: string, pid: string) {
    this.Savedid.id = id;
    this.Savedid.pid = pid;
    return this.Savedid;
  }

  public saveClinical(clinical: Clinical) {
    return this.http.post(`${environment.serverUrl}/registration/clinical`, clinical, this.httpOptions);
  }

  public saveClinicalFollowUp(clinical: Clinical) {
    return this.http.post(`${environment.serverUrl}/registration/clinicalFollowUp`, clinical, this.httpOptions);
  }

  public saveSterilization(Sterilization: Clinical) {
    return this.http.post(`${environment.serverUrl}/registration/sterilization`, Sterilization, this.httpOptions);
  }
  public saveDeworming(deworming: Clinical) {
    return this.http.post(`${environment.serverUrl}/registration/deworming`, deworming, this.httpOptions);
  }
  public saveVaccination(Vaccination: Clinical) {
    debugger;
    return this.http.post(`${environment.serverUrl}/registration/vaccination`, Vaccination, this.httpOptions);
  }

  public savePetRegistration(petregistration: PetRegistration) {
    return this.http.post(`${environment.serverUrl}/petRegistration/`, petregistration, this.httpOptions);
  }

  public getPetRegistrationNumber(petRegistrationNo: string) {
    return this.http.get<PetRegistration>(
      `${environment.serverUrl}/petRegistration/${petRegistrationNo}/petDetails`,
      this.httpOptions
    );
  }

  public getPetRegistrationNumberMass(petRegistrationNo: string) {
    return this.http.get<PetRegistration>(
      `${environment.serverUrl}/petRegistration/${petRegistrationNo}/petDetails`,

      this.httpOptions
    );
  }

  public getPetRegistrationNumberMassSterilisation(petRegistrationNo: string) {
    return this.http.get<PetRegistration>(
      `${environment.serverUrl}/petRegistration/${petRegistrationNo}/petDetailsMassSterilisation`,

      this.httpOptions
    );
  }

  public getTagDetails(tagNo: string) {
    return this.http.get<PetRegistration>(
      `${environment.serverUrl}/dogSterilization/${tagNo}/sterilizarionetails`,

      this.httpOptions
    );
  }
  public getMicrochipNumber(microchipNumber: any) {
    return this.http.get<PetRegistration>(
      `${environment.serverUrl}/petRegistration/${microchipNumber}/petDetailsChip`,

      this.httpOptions
    );
  }

  public uploadAttachment(file: File, uname: string, docName: string) {
    const endpoint = `${environment.serverUrl}/petRegistration/uploadDocFile/${uname}/${docName}`;
    const formData: FormData = new FormData();
    formData.append('File', file, file.name);
    return this.http.post(endpoint, formData);
  }

  public updateUploadAttachment(file: File, uname: string, docName: string, documentId: number) {
    const endpoint = `${environment.serverUrl}/petRegistration/updateUploadDocFile/${uname}/${docName}/${documentId}`;
    const formData: FormData = new FormData();
    formData.append('File', file, file.name);
    return this.http.post(endpoint, formData);
  }

  public updatePetRegistration(petregistration: PetRenwal) {
    debugger;
    return this.http.post(`${environment.serverUrl}/petRegistration/update`, petregistration, this.httpOptions);
  }

  public getDoc(petRegistrationNumber: string, docName: string) {
    return this.http.get<any>(
      `${environment.serverUrl}/petRegistration/${petRegistrationNumber}/${docName}/petImage`,
      this.httpOptions
    );
  }
  public loadCaseById(id: number, type: string): Observable<Cases> {
    return new Observable<Cases>((observer) => {
      this.http.get<Cases>(`${environment.serverUrl}/flash/${id}/${type}/allCase`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public loadMedicationById(id: number): Observable<MedicationData> {
    return new Observable<MedicationData>((observer) => {
      this.http
        .get<MedicationData>(`${environment.serverUrl}/registration/${id}/medicationById`, this.httpOptions)
        .subscribe(
          (response) => {
            observer.next(response);
          },
          () => observer.error()
        );
    });
  }

  public updateOwnershipTransfer(petregistration: PetRegistration) {
    return this.http.post(`${environment.serverUrl}/petRegistration/update`, petregistration, this.httpOptions);
  }

  // MassDog Vaccination

  public saveMassDog(massDogVaccination: MassDogVaccination) {
    return this.http.post(`${environment.serverUrl}/masDogVaccination/`, massDogVaccination, this.httpOptions);
  }

  public saveDogSterilization(dogSterilization: DogSterilization) {
    return this.http.post(`${environment.serverUrl}/dogSterilization/dog`, dogSterilization, this.httpOptions);
  }

  // forReassinging
  public saveDogRegistration(dogRegistrationValueReassigning: any) {
    console.log('i am here', dogRegistrationValueReassigning);
    return this.http.post(
      `${environment.serverUrl}/massRegistration/`,
      dogRegistrationValueReassigning,
      this.httpOptions
    );
  }

  public saveFlashReport(flashReport: FlashReport) {
    return this.http.post(`${environment.serverUrl}/flash/`, flashReport, this.httpOptions);
  }

  public saveFollowUpReport(flashReport: FlashReport) {
    return this.http.post(`${environment.serverUrl}/flash/followUpNcah/`, flashReport, this.httpOptions);
  }

  public saveFollowUp(flashReport: FlashReport) {
    return this.http.post(`${environment.serverUrl}/flash/followUp/`, flashReport, this.httpOptions);
  }

  flashId(id: string, OID: string) {
    this.SaveOutBreakdid.id = id;
    this.SaveOutBreakdid.OID = OID;
    return this.SaveOutBreakdid;
  }

  public submitEpidiology(caseData: CaseData) {
    return this.http.post(`${environment.serverUrl}/flash/case`, caseData, this.httpOptions);
  }
  submitMassTreatment(mass: MassData) {
    return this.http.post(`${environment.serverUrl}/massRegistration/mass/`, mass, this.httpOptions);
  }

  //flash
  public deleteCase(id: number, type: string) {
    return this.http.post(`${environment.serverUrl}/flash/${id}/${type}/deleteCase`, this.httpOptions);
  }
  public deleteMedication(id: number) {
    return this.http.post(`${environment.serverUrl}/registration/medication/${id}/delete`, this.httpOptions);
  }
  public updateMedication(medicationData: MedicationData, id: number) {
    return this.http.post(`${environment.serverUrl}/registration/medication/${id}`, medicationData, this.httpOptions);
  }
  public updateMedications(medicines: Medicines, id: number) {
    return this.http.post(`${environment.serverUrl}/registration/medication/${id}`, medicines, this.httpOptions);
  }

  public updateRegistration(search: SearchDetails) {
    return this.http.post(`${environment.serverUrl}/registration/updateRegistration`, search, this.httpOptions);
  }

  public updateMassRegistration(massSearch: MassSearch) {
    return this.http.post(
      `${environment.serverUrl}/massRegistration/updateMassRegistration`,
      massSearch,
      this.httpOptions
    );
  }

  public saveCase(cases: Cases) {
    return this.http.post(`${environment.serverUrl}/flash/case`, cases, this.httpOptions);
  }

  public saveFlashCaseOwner(cases: Cases) {
    debugger;
    return this.http.post(`${environment.serverUrl}/flash/flashCaseOwner`, cases, this.httpOptions);
  }

  public saveFlashCase(cases: Cases) {
    return this.http.post(`${environment.serverUrl}/flash/flashCase`, cases, this.httpOptions);
  }

  public loadMedication(): Observable<MedicationData[]> {
    return new Observable<MedicationData[]>((observer) => {
      this.http.get<MedicationData[]>(`${environment.serverUrl}/registration/medication`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public loadMedicationData(): Observable<MedicationData[]> {
    return new Observable<MedicationData[]>((observer) => {
      this.http.get<MedicationData[]>(`${environment.serverUrl}/medicine/`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public saveMedication(medicationData: MedicationData) {
    return this.http.post(`${environment.serverUrl}/registration/medication`, medicationData, this.httpOptions);
  }
  public saveMedicines(medicationData: MedicationData) {
    return this.http.post(`${environment.serverUrl}/medicine/`, medicationData, this.httpOptions);
  }

  public updateMedicines(medicines: Medicines, id: number) {
    return this.http.post(`${environment.serverUrl}/medicine/${id}/update`, medicines, this.httpOptions);
  }

  public deleteMedicines(id: number) {
    return this.http.post(`${environment.serverUrl}/medicine/${id}/delete`, this.httpOptions);
  }

  public updateCase(id: number, type: string) {
    return this.http.post(`${environment.serverUrl}/flash/${id}${type}/poultryCase`, this.httpOptions);
  }

  public loadCountry(): Observable<Country[]> {
    return new Observable<Country[]>((observer) => {
      this.http.get<Country[]>(`${environment.serverUrl}/country/`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  //report

  public getReport(reportRequest: ReportRequest) {
    return this.http.post<any>(`${environment.serverUrl}/report/dpm`, reportRequest, this.httpOptions);
  }

  public getMdvReport(reportRequest: ReportRequest) {
    return this.http.post<any>(`${environment.serverUrl}/report/mdv`, reportRequest, this.httpOptions);
  }
  public getPetReport(reportRequest: ReportRequest) {
    return this.http.post<any>(`${environment.serverUrl}/report/petReport`, reportRequest, this.httpOptions);
  }

  // public getMdvReport(fromDate: string, toDate: string) {
  //   return this.http.get<any>(`${environment.serverUrl}/report/${fromDate}/${toDate}/mdv`, this.httpOptions);
  // }
  public getFlashData() {
    return this.http.get<any>(`${environment.serverUrl}/flash/get-all`, this.httpOptions);
  }

  public getRegisteredCaseByDzongkhag(fromDate: string, toDate: string) {
    return this.http.get<any>(
      `${environment.serverUrl}/view-report/case-registered-per-dzongkhag/${fromDate}/${toDate}`,
      this.httpOptions
    );
  }

  public getMapData(fromDate: string, toDate: string) {
    return this.http.get<any>(`${environment.serverUrl}/view-report/map-data/${fromDate}/${toDate}`, this.httpOptions);
  }

  public getMassDetails(massRegistrationId: any) {
    return this.http.get<any>(
      `${environment.serverUrl}/massRegistration/massSearch/${massRegistrationId}`,
      this.httpOptions
    );
  }

  public getByMRNCID(MRNCID: any) {
    return this.http.get<any>(`${environment.serverUrl}/massRegistration/searchByMRNCID/${MRNCID}`, this.httpOptions);
  }

  //Outbreak
  public getByOutbreakID(outbreakID: any) {
    return this.http.get<any>(`${environment.serverUrl}/report/searchOutbreakID/${outbreakID}`, this.httpOptions);
  }

  public getOwnerDetails(outbreak_id: any, report_status: any) {
    return this.http.get<any>(
      `${environment.serverUrl}/report/getOwnerDetails/${outbreak_id}/${report_status}`,
      this.httpOptions
    );
  }

  public getOutBreakCaseDetails(outbreak_id: any, report_status: any, cid_number: any) {
    return this.http.get<any>(
      `${environment.serverUrl}/report/getOutBreakCaseDetails/${outbreak_id}/${report_status}/${cid_number}`,
      this.httpOptions
    );
  }

  public getFateDetails(outbreak_id: any, report_status: any, cid_number: any) {
    return this.http.get<any>(
      `${environment.serverUrl}/report/getFateDetails/${outbreak_id}/${report_status}/${cid_number}`,
      this.httpOptions
    );
  }

  public getSusceptibleDetails(outbreak_id: any, report_status: any) {
    return this.http.get<any>(
      `${environment.serverUrl}/report/getSusceptibleDetails/${outbreak_id}/${report_status}`,
      this.httpOptions
    );
  }

  //mass
  public searchMassDetails(massRegistrationId: string, massId: number) {
    return this.http.get<any>(
      `${environment.serverUrl}/report/massSearch/${massRegistrationId}/${massId}`,
      this.httpOptions
    );
  }

  getMassTreatmentDetails(
    speciesId: number,
    treatement: string,
    massRegistrationId: string,
    massId: number,
    treatementDate: Date
  ) {
    return this.http.get<any>(
      `${environment.serverUrl}/report/treatmentDetails/
       ${speciesId}/${treatement}/${massRegistrationId}/${massId}/${treatementDate}`,
      this.httpOptions
    );
  }

  getOwnerDetailsofDogofRegister(cidNumber: number) {
    debugger;
    return this.http.get<any>(`${environment.serverUrl}/report/ownerDetails/${cidNumber}`, this.httpOptions);
  }

  getMassMedDetails(medId: number, massRegId: string) {
    return this.http.get<any>(
      `${environment.serverUrl}/massRegistration/${medId}/${massRegId}/medDetails`,
      this.httpOptions
    );
  }

  //  getMassVaccDetails(medId : number, massRegId: string) {
  //   return this.http.get<any>(`${environment.serverUrl}/massRegistration/${medId}/${massRegId}/vaccDetails`,
  //   this.httpOptions);
  //  }

  getMassVaccDetails(medId: number, massRegistrationId: string) {
    return this.http.get<any>(
      `${environment.serverUrl}/report/vaccDetails/${medId}/${massRegistrationId}`,
      this.httpOptions
    );
  }

  public saveMassCase(cases: Cases) {
    return this.http.post(`${environment.serverUrl}/massRegistration/massCase`, cases, this.httpOptions);
  }

  public saveMassMed(medicationData: MedicationData) {
    return this.http.post(`${environment.serverUrl}/massRegistration/massMed`, medicationData, this.httpOptions);
  }

  public loadMassCaseById(id: number): Observable<Cases> {
    return new Observable<Cases>((observer) => {
      this.http.get<Cases>(`${environment.serverUrl}/massRegistration/${id}/massCaseById`, this.httpOptions).subscribe(
        (response) => {
          observer.next(response);
        },
        () => observer.error()
      );
    });
  }

  public loadMassMedById(id: number): Observable<MedicationData> {
    return new Observable<MedicationData>((observer) => {
      this.http
        .get<MedicationData>(`${environment.serverUrl}/massRegistration/${id}/massMedById`, this.httpOptions)
        .subscribe(
          (response) => {
            observer.next(response);
          },
          () => observer.error()
        );
    });
  }

  public deleteMass(id: number) {
    return this.http.post(`${environment.serverUrl}/massRegistration/${id}/deleteMass`, this.httpOptions);
  }
  public deleteMassMed(id: number) {
    return this.http.post(`${environment.serverUrl}/massRegistration/${id}/deleteMassMed`, this.httpOptions);
  }

  public getAllDPM() {
    return this.http.get<any>(`${environment.serverUrl}/dogSterilization/getTotalCount`, this.httpOptions);
  }

  public getAllMDV() {
    return this.http.get<any>(`${environment.serverUrl}/masDogVaccination/getAllVaccinationDetails`, this.httpOptions);
  }

  public getDashCounts(dashCounts: ReportRequest) {
    return this.http.post<any>(`${environment.serverUrl}/report/counts`, dashCounts, this.httpOptions);
  }

  public getVaccinatationDetails(petRegistrationNo: string, microchipNumber: string) {
    if (microchipNumber === '') {
      microchipNumber = petRegistrationNo;
    }
    return this.http.get<any>(
      `${environment.serverUrl}/report/getVaccinatationDetails/${petRegistrationNo}/${microchipNumber}`,
      this.httpOptions
    );
  }

  public getOwnerDetailsofDog(petRegistrationNo: string, microchipNumber: string) {
    if (microchipNumber === '') {
      microchipNumber = petRegistrationNo;
    }
    debugger;
    return this.http.get<any>(
      `${environment.serverUrl}/report/getOnwerDetailsofPet/${petRegistrationNo}/${microchipNumber}`,
      this.httpOptions
    );
  }

  public getOwnerDetailsodTranfer(petRegistrationNo: string, microchipNumber: string) {
    if (microchipNumber === '') {
      microchipNumber = petRegistrationNo;
    }
    return this.http.get<any>(
      `${environment.serverUrl}/report/getOnwerDetailsofTransfer/${petRegistrationNo}/${microchipNumber}`,
      this.httpOptions
    );
  }

  public getIndivClinicalReport(reports: ReportRequest) {
    debugger;
    return this.http.post<any>(`${environment.serverUrl}/report/indivClinical`, reports, this.httpOptions);
  }

  public getIndivDewormingReport(reports: ReportRequest) {
    return this.http.post<any>(`${environment.serverUrl}/report/indivDeworming`, reports, this.httpOptions);
  }

  public getIndivSterializationReport(reports: ReportRequest) {
    return this.http.post<any>(`${environment.serverUrl}/report/indivSterialization`, reports, this.httpOptions);
  }

  public getIndivVaccinationReport(reports: ReportRequest) {
    return this.http.post<any>(`${environment.serverUrl}/report/IndivVaccination`, reports, this.httpOptions);
  }

  public getMassClinicalReport(reports: ReportRequest) {
    return this.http.post<any>(`${environment.serverUrl}/report/massClinical`, reports, this.httpOptions);
  }

  public getMassVaccReport(reports: ReportRequest) {
    return this.http.post<any>(`${environment.serverUrl}/report/massVacc`, reports, this.httpOptions);
  }

  public getOutBreakReport(reports: ReportRequest) {
    return this.http.post<any>(`${environment.serverUrl}/report/outBreakReport`, reports, this.httpOptions);
  }

  public getOutBreakReportSummary(reports: ReportRequest) {
    return this.http.post<any>(`${environment.serverUrl}/report/outBreakReportSummary`, reports, this.httpOptions);
  }

  public getMassCar(reports: ReportRequest) {
    return this.http.post<any>(`${environment.serverUrl}/report/massCar`, reports, this.httpOptions);
  }

  public getDataArchival() {
    return this.http.post<any>(`${environment.serverUrl}/report/dataArchival`, this.httpOptions);
  }

  public getFlashMailData(reports: ReportRequest) {
    return this.http.post<any>(`${environment.serverUrl}/report/flashMail`, reports, this.httpOptions);
  }

  public getFollowUpMailData(reports: ReportRequest) {
    return this.http.post<any>(`${environment.serverUrl}/report/followUpMail`, reports, this.httpOptions);
  }
}
