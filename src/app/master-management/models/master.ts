export enum RestMethods {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  OPTION = 'OPTION',
  HEAD = 'HEAD',
  DELETE = 'DELETE',
}

export class SearchDetails {
  day: number;
  month: number;
  year: number;
  bodyweight: number;
  patientId: string;
}

export class MassSearch {
  nationality: string;
  passportNumber: string;
  cidNumber: number;
  ownerName: string;
  dzongkhagId: number;
  gewogId: number;
  mobileNumber: number;
  emailId: string;
  locality: string;
  ownershipTypeId: number;
  villageId: number;
  countryId: number;
  massRegistrationId: string;
}

export class CatchingMethod {
  id: number;
  catchName: string;
  status: string;
}
export class DewormingCondition {
  id: number;
  conditionsName: string;
  status: string;
}
export class Program {
  id: number;
  programName: string;
  status: string;
}

export class AgeGroup {
  id: number;
  ageName: string;
  status: string;
}

export class DiseaseSampleType {
  id: number;
  sampleName: string;
  status: string;
}

export class Laboratory {
  id: number;
  labName: string;
  status: string;
}
export class VaccineType {
  id: number;
  vaccineName: string;
  speciesId: number;
  vaccineTypeId: number;
  status: string;
}

export class Reaction {
  id: number;
  reactionName: string;
  status: string;
}

export class Frequency {
  id: number;
  frequencyName: string;
  status: string;
}

export class TypeOfTest {
  id: number;
  typeoftest: string;
  status: string;
}

export class FarmingSystem {
  id: number;
  farmName: string;
  status: string;
}
export class ClinicalTreat {
  id: number;

  proceduresName: string;
  status: string;
}
export class BasisOfDiagnosis {
  id: number;
  basisName: string;
  status: string;
}

export class Tests {
  id: number;
  resultName: string;
  status: string;
}
export class PetRegistration {
  id: number;
  ownerType: string;
  status: string;
  nationality: number;
}
export class AdminRoute {
  id: number;
  routeName: string;
  status: string;
}
export class SkinCondition {
  id: number;
  conditionName: string;
  createdBy: string;
  status: string;
}
export class UserType {
  id: number;
  userType: string;
  status: string;
}
export class UserLevel {
  id: number;
  levelName: string;
  status: string;
}

export class Centre {
  id: number;
  centreAgencies: string;
  status: string;
}

export class CreateUser {
  id: number;
  cid: number;
  fullName: string;
  designationId: number;
  mobileNo: number;
  emailId: string;
  roleId: any[];
  newUser: string;
  programId: number;
  userRole: any;
  designation: any;
  userLevelId: number;
  // centreId: number;
  centreAgenciesId: number;
  levelUser: any;
  centre: any;
  jurisdiction: any;
  program: any;
  userTypeId: number;
  userType: any;
}

export class Cases {
  speciesId: number;
  animalTypeId: number;
  animalType: string;
  breedId: number;
  age: string;
  male: number;
  female: number;
  mixed: number;
  total: number;
  status: String;
  outbreakId: string;
  flashId: number;
  type: string;
  susceptibleAnimals: number;
  species: string;
  breed: string;
  fate: string;
  numbers: string;
  id: number;
  vaccineTypeId: number;
  createdBy: string;
  cidNumber: number;
  ownerName: string;
  dzongkhagId: number;
  gewogId: number;
  villageName: string;
  villageId: number;
  latitude: number;
  longitude: number;
  primaryDate: Date;
  reportStatus: number;
  farmingId: number;
  lastVaccinationDate: Date;
  massRegistrationId: string;
  massId: number;
  treatmentId: number;
  treatment: string;
  vaccinationState: string;
  reasons: string;
  notVaccinated: string;
  treatementDate: Date;
  dateDate: Date;
  ownershipStatus: string;
}

export class FlashTaskList {
  id: number;
  outbreakId: string;
}

export class ClinicalDetails {
  id: number;
  treatmentDate: Date;
  observation: string;
}

export class Roles {
  id: number;
  roleName: string;
  status: string;
}

export class Designations {
  id: number;
  designationName: string;
  status: string;
}
export class DewormingDiagnosticTest {
  id: number;
  typeOfTest: string;
  //   status: string;
  // }
}

export class BreedMapping {
  id: number;
  breed: string;

  speciesId: number;
  species: Species;
  status: string;
}

export class Species {
  id: number;
  speciesName: string;
  conditionsId: number;
  types: string;
}
export class Villages {
  id: number;
  villageName: string;
  // gewogId: number;
  // dzongkhagId:number;
  gewog: Gewogs;
  // dzongkhag:Dzongkhags;
  status: string;
}

export class Country {
  id: number;
  countryName: string;
}

export class Disease {
  id: number;
  diseaseName: string;
  notifiable: string;
  createdBy: string;
  status: string;
}
// export class TypeOFTest {
//   id: number;
//   diseaseName: string;
//   notifiable: string;
//   createdBy: string;
// }

// export interface System {
//   id: number;
//   systemName: string;
// }

// export interface Class {
//   id: number;
//   className: string;
// }

export interface MedicationTableData {
  class: Class;
}

export interface Frequency {
  id: number;
  frequencyName: string;
  status: string;
}

export interface Procedure {
  id: number;
  proceduresName: string;
  status: string;
}
// export class Medicines {
//   id: number;
//   name: string;;
//   unit: string;
//   composition: string;
//   presentation: string;
//   dosage:string
//   classEntity:Class[]
//   classId:any

// }

export class Medicines {
  id: number;
  medicineName: string;
  unit: string;
  composition: string;
  presentation: string;
  classEntity: Class;
  medicinesId: number;
  status: string;
}

export class MedClass {
  id: number;
  name: string;
  classId: number;
}

export interface TreatmentData {
  advice: string;
  clinicalCondition: string;
  conditionId: number;
  observation: string;
  procedureId: number;
  anamnesisHistory: string;
  remarks: string;
  treatment: string;
  medication: [
    {
      classId: number;
      medicineId: number;
      routeId: number;
      frequencyId: number;
      duration: number;
    }
  ];
}

export class PetBreeds {
  breed: string;
  id: number;
}
export class Dzongkhags {
  id: number;
  dzongkhagName: string;
}

export class Gewogs {
  id: number;
  gewogName: string;
  dzongkhagId: number;
  dzongkhag: Dzongkhags;
  status: string;
}
export class OwnershipTypes {
  id: number;
  ownerType: string;
}

export class AnimalTypes {
  id: number;
  animalType: string;
  speciesId: number;
  status: string;
  species: any;
}

export class Conditions {
  id: number;
  conditions: string;
  system: System;
  systemId: number;
  classId: number;
  status: string;
  classMaster: any;
}

export class Breeds {
  id: number;
  breedName: string;
  status: string;
}
export class DeworningCondition {
  id: number;
  dewormingName: string;
}

export class System {
  id: number;
  systemName: string;
  status: string;
}
export class ClinicalDiagnosticTest {
  id: number;
  clinicalTest: string;
}
export class Class {
  id: number;
  className: string;
  status: string;
}

export enum Jurisdiction {
  DVH = 'dzongkhag',
  ResearchCentre = 'gewog',
}

export class DoseUnit {
  id: number;
  unitType: string;
  createdBy: string;
  status: string;
}
