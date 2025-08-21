import { FormControl, Validators } from '@angular/forms';
import { AppRoutingModule } from '@app/app-routing.module';

export class Registration {
  cidNumber: number;
  passportNumber: string;
  ownerName: string;
  dzongkhagId: number;
  gewogId: number;
  villageId: number;
  mobileNumber: number;
  emailId: string;
  locality: string;
  petRegistrationTypeId: number;
  earTagNumber: string;
  microchipNumber: string;
  nationality: number;
  petRegistrationNumber: string;
  animalName: string;
  locationOfAnimal: string;
  speciesId: number;
  animalTypeId: number;
  breedId: number;
  age: string;
  sex: string;
  bodyweight: number;
  weightUnit: string;
  treatment: string;
  countryId: number;
  //userDetails
  userName: string;
  centreId: number;
  levelUserId: number;
  jurisdiction: string;
  fullName: string;
}

export class Dzongkhags {
  id: number;
  dzongkhagName: string;
}
export class Country {
  id: number;
  countryName: string;
}

export class Gewogs {
  id: number;
  gewogName: string;
}
// export class Laboratory {
//   id: number;
//   labName: string;
// }

export class PetRegistration {
  [x: string]: any;
  villageName: string;
  petRegistrationTypeId: number;
  registrationDate: Date;
  ownerName: string;
  dzongkhagId: number;
  gewogId: number;
  locality: string;
  mobileNumber: number;
  emailId: string;
  petName: string;
  speciesId: number;
  microchipNumber: string;
  petBreedId: number;
  colour: string;
  abandonedate: Date;
  petRegistrationNumber: string;
  receiptNumber: string;
  distinguishingMark: string;
  sex: string;
  month: number;
  dateRenewal: Date;
  year: number;
  day: number;
  villageId: number;
  petRegistrationNo: string;
  petRegistrationType: any;
  dzongkhag: any;
  gewog: any;
  species: any;
  petBreed: any;
  petRegistrationId: any;
  id: number;
  fileId: number;
  passportNumber: string;
  breederStatus: string;
  neuterStatus: string;
  countryId: any;
  cid: number;
  vaccineId: number;
  animalName: string;
  speciesName: string;
  breed: string;
  treatmentDate: any;
  vaccinationDetails: any;
  dewormingDetails: any;
  dewormingDetailsDate: any;
  countryName: any;
  registerDate: Date;
  transferDate: Date;

  //userDetails
  userName: string;
  centreId: number;
  levelUserId: number;
  jurisdiction: string;
  fullName: string;
}
export interface FormData {
  name: string;
  file: File;
}

export class OwnershipTransfer {
  villageName: string;
  petRegistrationTypeId: number;
  registrationDate: Date;
  ownerName: string;
  dzongkhagId: number;
  dzongkhagName: string;
  gewogName: string;
  gewogId: number;
  locality: string;
  mobileNumber: number;
  emailId: string;
  petName: string;
  speciesId: number;
  microchipNumber: string;
  petBreedId: number;
  colour: string;
  petRegistrationNumber: string;
  receiptNumber: string;
  distinguishingMark: string;
  sex: string;
  month: number;
  dateRenewal: Date;
  year: number;
  day: number;
  villageId: number;
  petRegistrationNo: string;
  petRegistrationType: any;
  dzongkhag: any;
  gewog: any;
  species: any;
  petBreed: any;
  petRegistrationId: any;
  id: number;
  village: string;
  cid: number;
  vaccineId: number;
  animalName: string;
  speciesName: string;
  breed: string;
  transferDate: Date;
}
export class PetRenwal {
  [x: string]: any;
  villageName: string;
  petRegistrationTypeId: number;
  registrationDate: Date;
  ownerName: string;
  dzongkhagId: number;
  dzongkhagName: string;
  gewogName: string;
  gewogId: number;
  locality: string;
  mobileNumber: number;
  emailId: string;
  petName: string;
  speciesId: number;
  microchipNumber: string;
  petBreedId: number;
  colour: string;
  petRegistrationNumber: string;
  receiptNumber: string;
  distinguishingMark: string;
  sex: string;
  month: number;
  dateRenewal: Date;
  year: number;
  day: number;
  villageId: number;
  petRegistrationNo: string;
  petRegistrationType: any;
  dzongkhag: any;
  gewog: any;
  species: any;
  petBreed: any;
  petRegistrationId: any;
  id: number;
  nationality: string;
  status: string;
  village: string;
  cid: number;
  vaccineId: number;
  animalName: string;
  speciesName: string;
  breed: string;
  countryId: any;
  abandonedDate: Date;
  userName: string;
  centreId: number;
  levelUserId: number;
  jurisdiction: string;
  fullName: string;
  registerDate: Date;
}

export class MassDogVaccination {
  id: number;
  vaccineType: string;
  vaccinationDate: Date;
  dzongkhagId: number;
  villageId: number;
  gewogId: number;
  animalTypeId: number;
  microchipNumber: string;
  sex: string;
  neuterStatus: string;
  ownershipStatus: string;
  ownerName: string;
  mobileNumber: number;
  petName: string;
  programId: number;
  bodyColour: string;
  petRegistrationNumber: string;
  catchMethodId: number;
  longitude: number;
  latitude: number;
  petBreedId: number;
  year: number;
  day: number;
  month: number;
  locality: string;
  cid: number;
  petRegistrationNo: string;
  tagNo: string;
  petRegistrationNoOrMicrochip: string;
  userName: string;
  centreId: number;
  levelUserId: number;
  jurisdiction: string;
  fullName: string;
  device: string;
}

export class DogSterilization {
  id: number;
  villageId: number;
  gewogId: number;
  sterilizationDate: Date;
  tagNo: string;
  petRegistrationNo: string;
  dzongkhagId: number;
  petBreedId: number;
  sex: string;
  ageGroupMassId: number;
  neuterStatus: string;
  animalTypeId: number;
  clinicalLocation: string;
  weight: number;
  bodyColour: string;
  healthCondition: string;
  otherConditions: string;
  surgeonName: string;
  vaccinationStatus: string;
  fate: string;
  ownershipStatus: string;
  ownerName: string;
  mobileNumber: number;
  petName: string;
  petRegistrationNumber: string;
  catchMethodId: number;
  longitude: number;
  latitude: number;
  foetuses: number;
  pregnancyStage: string;
  petRegistrationNoOrMicro: any;
  pregnancyStatus: string;
  locality: string;
  skinConditionId: number;
  transmissibleTumour: string;
  postOperative: string;
  microchipNumber: any;
  cid: number;
  petRegistrationNoOrMicrochip: any;
  device: string;
  type: string;

  //userDetails
  userName: string;
  centreId: number;
  levelUserId: number;
  jurisdiction: string;
  fullName: string;
  base64Image: any;
  image: any;
}
export class DogRegistration {
  mass_id: number;
  cidNumber: number;
  passportNumber: string;
  ownerName: string;
  villageId: number;
  dzongkhagId: number;
  gewogId: number;
  mobileNumber: number;
  emailId: string;
  locality: string;
  massRegistrationId: string;
  ownershipTypeId: number;
  nationality: number;
}

export class ReportRequest {
  fromDate: Date;
  toDate: Date;
  programId: string;
  ownershipStatus: string;
  dzongkhagId: string;
  gewogId: string;
  petBreedId: string;
  petRegistrationtypeId: string;
  sex: string;
  healthCondition: string;
  skinConditionId: string;
  transmissibleTumour: string;
  pregnancyStatus: string;
  vaccinationStatus: string;
  postOperative: string;
  fate: string;
  neuterStatus: string;
  catchMethodId: string;
  nationality: string;
  countryId: string;
  speciesId: string;
  breedId: string;
  classId: string;
  medicineId: string;
  animalTypeId: string;
  vaccineTypeId: string;
  ownerTypeId: string;
  treatment: string;
  levelUser: string;
  centre: string;
  userName: string;
  jurisdiction: string;
  levelUserId: string;
  centreId: number;

  status: string;
  massRegistrationNo: string;
  outbreakId: string;
  reportStatus: number;
  systemId: string;
  conditionsId: string;
  reactionId: string;
  composition: string;
  centreAgencies: string;
}
export interface RegistrationId {
  id: string;
  pid: string;
}
export interface FlashId {
  id: string;
  OID: string;
}

export class Clinical {
  treatment: string;
  registrationId: number;
  conditionsId: number;
  observation: string;
  advice: string;
  clinicalCondition: string;
  medicationData: MedicationData[];
  remarks: string;
  patientId: string;
  treatmentDate: Date;
  conditions: string;
  anamnesisHistory: string;
  diagnosticSystemName: string;
  dueDate: Date;
  vaccineTypeId: number;
  reactionId: number;
  status: string;
  testRequest: string;
  dewormingName: any;
  procedures: any[];
  caseId: any;
  id: any;
  petRegistrationNumber: string;
  microchipNumber: string;
  systemId: number;
  typeOfTest: any;
  clinicalTest: any;
  finalSystemsId: number;
  finalConditionsId: number;
  reactionDetail: string;
}

export class Sterilization {
  treatment: string;
  registrationId: number;
  observation: string;
  advice: string;
  condition: string;
  medicationData: MedicationData[];
  remarks: string;
  patientId: string;
  treatmentDate: Date;
}

export class MedicationData {
  id: number;
  classId: number;
  medicineId: number;
  presentation: number;
  composition: string;
  routeId: number;
  frequencyId: number;
  duration: number;
  dosage: number;
  patientId: string;
  registrationId: number;
  unitId: number;
  stock: any;
  doseUnitId: any;
  flag: number;
  classEntity: any;
  medicineEntity: any;
  frequency: any;
  route: any;
  unit: any;
  massRegistrationId: string;
  massId: number;
  treatmentId: number;
  treatment: string;
  createdBy: string;
  vaccineTypeId: number;
  vaccineType: any;
  nationality: string;
  countryId: number;
}

export class VisReport {
  fromDate: string;
  toDate: string;
  service: string;
}

export class FlashReport {
  id: number;
  villageName: string;
  dzongkhagId: number;
  gewogId: number;
  diseaseId: number;
  briefHistory: string;
  latitude: number;
  longitude: number;
  ownerName: string;
  caseDate: string;
  reportDate: string;
  forwardDate: string;
  notifiability: string;
  householdAffected: number;
  vaccinationDate: Date;
  createdBy: string;
  reportBy: string;
  flashCase: FlashCase[];
  flashSuceptible: FlashSuceptible[];
  poultryCase: PoultryCase[];
  poultryDeathCase: PoultryDeathCase[];
  otherCase: OtherCase[];
  otherDeathCase: OtherDeathCase[];
  suceptibleCase: suceptibleCase[];
  outbreakId: string;
  flashId: number;
  followUp: FollowUp;
  reportStatus: number;
  flag: string;
  locality: string;
  finalBasisDiagnosisId: number;
  basisDiagnosisId: number;
  //userDetails
  userName: string;
  centreId: number;
  levelUserId: number;
  villageId: number;
  jurisdiction: string;
  fullName: string;
  ownershipStatus: string;
}

export class FlashCase {}
export class FlashSuceptible {}
export class FollowUp {
  followUpDate: string;
  followupCases: number;
  clinicalSigns: string;
  lesions: string;
  tentativeDiseaseId: number;
  differentialDiagnosis: string;
  sampleCollected: number;
  sampleId: number;
  testId: number;
  sampleIds: string;
  dateSampleSent: string;
  laboratoryId: number;
  dateResultReceived: string;
  resultId: number;
  finalDiseaseId: number;
  basisDiagnosisId: number;
  finalBasisDiagnosisId: number;
  diagnosingOfficer: string;
  farmingId: number;
  lastVaccinationDate: string;
  probableSource: string;
  controlMeasures: string;
}
export interface OtherCase {
  male: number;
  female: number;
  breedId: number;
  animalTypeId: number;
  age: number;
  total: number;
  speciesId: number;
  notchStatus: string;
}
export interface OtherDeathCase {
  male: number;
  female: number;
  breedId: number;
  animalTypeId: number;
  age: number;
  total: number;
  speciesId: number;
  notchStatus: string;
}

export interface PoultryCase {
  male: number;
  female: number;
  breedId: number;
  animalTypeId: number;
  age: number;
  total: number;
}
export interface PoultryDeathCase {
  male: number;
  female: number;
  breedId: number;
  animalTypeId: number;
  age: number;
  total: number;
}

export interface suceptibleCase {
  animalTypeId: number;
  total: number;
  speciesId: number;
}
export interface EpiCase {
  reporterName: string;
  mobileNumber: number;
  contractName: string;
  preventionControl: string;
  outbreakSource: string;
}

interface Age {
  age: string;
}
interface Vaccine {
  vaccine: string;
}
export const POUTRY_AGE: Age[] = [
  {
    age: 'Chick',
  },
  {
    age: 'Pullet',
  },
  {
    age: 'Adult',
  },
];

export const OTHER_AGE: Age[] = [
  {
    age: 'Adult',
  },
  {
    age: 'Young',
  },
];

export const VACCINE_STATUS: Vaccine[] = [
  {
    vaccine: 'Vaccinated',
  },
  {
    vaccine: 'Not Vaccinated',
  },
];

interface Type {
  type: string;
}
export const POULTRY_TYPE: Type[] = [
  {
    type: 'Male',
  },
  {
    type: 'Female',
  },
  {
    type: 'Mixed',
  },
];

export const FATE_TYPE: Type[] = [
  {
    type: 'Culled/Slaughtered',
  },
  {
    type: 'Examined',
  },
  {
    type: 'Treated',
  },
  {
    type: 'Vaccinated',
  },
  {
    type: 'Isolation/Observation',
  },
];

interface Status {
  status: string;
}
export const STATUS_TYPE: Status[] = [
  {
    status: 'Live Case',
  },
  {
    status: 'Dead',
  },
];

interface NotchStatus {
  notchStatus: string;
}
export const NOTCH_STATUS: NotchStatus[] = [
  {
    notchStatus: 'YSSSSes',
  },
  {
    notchStatus: 'No',
  },
];

export interface MassData {
  massDetails?: MassDetails[];
  AddmedicationData?: any;
  vaccination?: any;
  id?: number;
  massRegistrationId?: string;
}

export class MassDetails {
  medicationData?: MedicationData[];
}

export interface CaseData {
  poultryCase?: any[];
  OtherCase?: any[];
  id?: number;
  flashId?: string;
}

export interface EmailData {
  mailTo?: any[];
  mailCc?: any[];
  flashEmailList?: FlashEmailList[];
}

export class FlashEmailList {
  outbreakId: string;
  dzongkhagName: string;
  gewogName: string;
  villageName: string;
  deadTotal: number;
  liveTotal: number;
  animalType: string;
  flag: string;
}
