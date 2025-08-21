export interface Staff {
  staffName: string;
  email: string;
  status: string;
}

export interface Task {
  agencyName: string;
  letterNo: string;
  letterDate: string;
  subject: string;
  senderName: string;
  fileCategoryName: string;
  receiptNo: string;
  caseStatus: string;
  letterStatus: string;
}

export class ViewTask {
  incomingLetterId: number;
  taskInstanceId: number;
  formKey: string;
}

export interface StatData {
  total: number;
}

export interface SearchParams {
  patientId: number;
  animalName: string;
  earTagNumber: string;
  microchipNumber: string;
  cidNumber: number;
  petRegistrationNumber: string;
}

declare module namespace {
  export interface Dzongkhag {
    id: number;
    dzongkhagName: string;
  }

  export interface Dzongkhag2 {
    id: number;
    dzongkhagName: string;
  }

  export interface Gewog {
    id: number;
    gewogName: string;
    dzongkhag: Dzongkhag2;
  }

  export interface System {
    id: number;
    systemName: string;
    createdOn: string;
    createdBy: string;
    updatedOn: string;
    updatedBy: string;
  }

  export interface Condition {
    id: number;
    conditions: string;
    system: System;
    createdOn: string;
    createdBy: number;
    updatedOn: string;
    updatedBy: number;
  }

  export interface Species {
    id: number;
    speciesName: string;
    conditions: Condition[];
    createdOn: string;
    createdBy: number;
    updatedOn: string;
    updatedBy: number;
  }

  export interface Clinical {
    id: number;
    treatmentDate?: any;
    advice: string;
    patientId: string;
    observation?: any;
    remarks: string;
    clinicalCondition?: any;
    registrationId: number;
  }

  export interface ClassEntity {
    id: number;
    className: string;
    status: string;
    createdOn: string;
    createdBy: number;
    updatedOn: string;
    updatedBy: number;
  }

  export interface ClassEntity2 {
    id: number;
    className: string;
    status: string;
    createdOn: string;
    createdBy: number;
    updatedOn: string;
    updatedBy: number;
  }

  export interface MedicineEntity {
    id: number;
    medicineName: string;
    composition: string;
    presentation: string;
    unit: string;
    classEntity: ClassEntity2;
    createdOn: string;
    createdBy: number;
    updatedOn: string;
    updatedBy: number;
  }

  export interface Route {
    id: number;
    routeName: string;
    createdOn: string;
    createdBy: string;
    updatedOn: string;
    updatedBy: number;
  }

  export interface Frequency {
    id: number;
    frequencyName: string;
    createdOn: string;
    createdBy: number;
    updatedOn: string;
    updatedBy: number;
  }

  export interface MedicineDtl {
    id: number;
    classEntity: ClassEntity;
    medicineEntity: MedicineEntity;
    route: Route;
    frequency: Frequency;
    registrationId: number;
  }

  export interface SearchResult {
    id: number;
    patientId: string;
    cidNumber: number;
    passportNumber: string;
    ownerName: string;
    dzongkhag: Dzongkhag;
    gewog: Gewog;
    mobileNumber: number;
    emailId: string;
    locality: string;
    earTagNumber: string;
    microchipNumber: string;
    petRegistrationNumber: string;
    animalName: string;
    locationOfAnimal: string;
    species: Species;
    age: string;
    sex: string;
    bodyweight: string;
    weightUnit: string;
    clinical: Clinical[];
    sterilization: any[];
    medicineDtls: MedicineDtl[];
  }
}

export class SearchResult {}
