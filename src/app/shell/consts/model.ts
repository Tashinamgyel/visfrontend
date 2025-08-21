import { Registration } from '@app/vis/shared/model/model';

import { routes } from './routes.enum';
export const MASTER_USER_ROUTES: MasterUserRoute[] = [
  // {
  //   route: routes.SPECIES,
  //   name: 'Species',
  // },
  {
    route: routes.SYSTEM,
    name: 'System',
  },
  {
    route: routes.CONDITIONS,
    name: 'Condition',
  },
  {
    route: routes.DEWORMINGDIANOSTICTEST,
    name: 'Deworming Diagnostic Test',
  },
  {
    route: routes.CLINICALDIANOSTICTEST,
    name: 'Clinical Diagnostic Test',
  },

  // {
  // route: routes.TYPEOFTEST,
  // name: 'Animal Disease Test Type',

  {
    route: routes.CLINICALTREAT,
    name: 'Clinical Procedures',
  },
  {
    route: routes.ADMINROUTE,
    name: 'Route ',
  },
  {
    route: routes.FREQUEENCY,
    name: 'Frequency',
  },
  {
    route: routes.VACCINETYPE,
    name: 'Vaccine Type',
  },
  // {
  //   route: routes.HEALTH,
  //   name: 'Vaccine Type',
  // },
  {
    route: routes.REACTION,
    name: 'AEFI',
  },
  {
    route: routes.PETREGISTRATIONTYPEONE,
    name: 'Animal Ownership Type',
  },
  {
    route: routes.DISEASES,
    name: 'Notifiable Diseases',
  },
  {
    route: routes.BREEDMAPPING,
    name: 'Pet Breed',
  },
  
  

  {
    route: routes.SKINCONDITION,
    name: 'Animal skin conditions',
  },
  {
    route: routes.CATCHINGMETHOD,
    name: 'Catching Method',
  },
  {
    route: routes.DISEASESAMPLETYPE,
    name: 'Sample Type',
  },
  // {
  //   route: routes.AGEGROUP,
  //   name: 'Age Group for Mass Dog',
  // },

  {
    route: routes.TYPEOFTEST,
    name: 'Type of Lab Test (Notifiable)',
  },

  {
    route: routes.FARMING,
    name: 'Farming System',
  },
  {
    route: routes.CLASS,
    name: 'Medicine Class',
  },
  {
    route: routes.ANIMALTYPES,
    name: 'Animal Type',
  },

  {
    route: routes.PROGRAM,
    name: 'Program',
  },
  {
    route: routes.LABORATORY,
    name: 'Laboratory',
  },

  {
    route: routes.MEDICINES,
    name: 'Medicines',
  },
  {
    route: routes.BREED,
    name: 'Breed (General)',
  },

  {
    route: routes.DOSEUNIT,
    name: 'Dose Unit',
  },

  {
    route: routes.DESIGNATION,
    name: 'Designation',
  },
  {
    route: routes.CENTRE,
    name: 'Centre',
  },
  {
    route: routes.CLINICALTEST,
    name: 'Basis of Diagnosis',
  },
  {
    route: routes.TESTRESULT,
    name: 'Lab Test Result',
  },
  {
    route: routes.DECONDITION,
    name: 'Deworming Condition',
  },
  {
    route: routes.GEWOGS,
    name: 'Gewog',
  },
  {
    route: routes.VILLAGES,
    name: 'Village',
  },
];

export interface MasterUserRoute {
  route: routes;
  name: string;
}

export const INDIVIDUAL: Individual[] = [
  {
    route: routes.SEARCH,
    name: 'Search by PID',
  },
  {
    route: routes.REGISTRATION,
    name: 'Registration',
  },
];
export interface Individual {
  route: routes;
  name: string;
}
export const MASS: Mass[] = [
  {
    route: routes.MASSSEARCH,
    name: 'Mass Registration',
  },
  {
    route: routes.MASS,
    name: 'Search',
  },
];

export interface Mass {
  route: routes;
  name: string;
}

export const PET_MANAGEMENTS: PetManagement[] = [
  {
    route: routes.PETREGISTRATION,
    name: 'Registration',
  },
  {
    route: routes.PETRENEWAL,
    name: ' Pet Registration Renewal and Update  ',
  },
  {
    route: routes.OWNERTRANSFER,
    name: 'Pet Ownership Transfer',
  },
  {
    route: routes.PETINFORMATION,
    name: ' Pet Information',
  },
];
export interface PetManagement {
  route: routes;
  name: string;
}

export const DOG_MANAGEMENTS: DogManagement[] = [
  {
    route: routes.DOGSTERILIZATION,
    name: ' Dog Population Management (DPM)',
  },
  {
    route: routes.DOGVACCINATION,
    name: ' Mass Dog Vaccination (MDV)',
  },
];

export interface DogManagement {
  route: routes;
  name: string;
}

export const USER_MANAGEMENTS: UserManagement[] = [
  {
    route: routes.CREATEUSER,
    name: ' Create User',
  },
  // {
  //   route:routes.DOGVACCINATION,
  //  name : ' Dog Vaccination',
  // },
];

export interface UserManagement {
  route: routes;
  name: string;
}
export const DISEASE_OUTBREAK: DiseaseOutbreak[] = [
  {
    route: routes.FLASHREPORT,
    name: 'Create New Flash Report',
  },
  // {
  //   route: routes.FOLLOWUP,
  //   name: ' Follow-up Report',
  // },
];

export interface DiseaseOutbreak {
  route: routes;
  name: string;
}

export const CERTIFICATE: Certificate[] = [
  {
    route: routes.PETCERTIFICATE,
    name: ' Pet Certificate',
  },
  {
    route: routes.VACCINECERTIFICATE,
    name: ' Vaccine Certificate (Individual)',
  },

  {
    route: routes.BREEDER,
    name: 'Breeder Statement',
  },
  {
    route: routes.MASSCERTIFICATE,
    name: 'Vaccine Certificate (Mass)',
  },
];
export interface Certificate {
  route: routes;
  name: string;
}

export const REPORT: Report[] = [
  {
    route: routes.REPORT,
    name: 'DPM Report',
  },
  {
    route: routes.REPORTMDV,
    name: 'MDV Report',
  },
  {
    route: routes.PETREPORT,
    name: 'Pet Information Report',
  },
  {
    route: routes.INDIVIDUALCLINICAL,
    name: 'Clinical Report (INDIV)',
  },
  {
    route: routes.INDIVIDUALDEWORMING,
    name: 'Deworming Report (INDIV)',
  },
  {
    route: routes.INDIVIDUALVACCINATION,
    name: 'Vaccination Report (INDIV)',
  },
  {
    route: routes.INDIVIDUALSTERILIZATION,
    name: 'Sterilization Report (INDIV)',
  },
  {
    route: routes.MASSCLINICALREPORT,
    name: 'Clinical Report (MASS)',
  },
  {
    route: routes.MASSDEWORMINGREPORT,
    name: 'Deworming Report (MASS)',
  },
  {
    route: routes.MASSVACCINATION,
    name: 'Vaccination Report (MASS)',
  },
 {
    route: routes.OUTBREAKREPORTSEARCH,
    name: 'Outbreak Report (Search)',
  },
  {
    route: routes.OUTBREAKREPORT,
    name: 'Outbreak Report (Detail)',
  },
  {
    route: routes.OUTBREAKREPORTSUMMARY,
    name: 'Outbreak Report (Summary)',
  },
];
export interface Report {
  route: routes;
  name: string;
}
