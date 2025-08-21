import { Title } from '@angular/platform-browser';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MediaObserver } from '@angular/flex-layout';
import { AuthenticationService, Credentials, CredentialsService } from '@app/auth';
import { routes } from '@app/shell/consts';
import { MatDialog } from '@angular/material/dialog';
import { MasterManagementComponent } from '@app/shell/components/master-management/master-management.component';
import { FlashDashboadComponent } from '@app/vis/disease-outbreak/components/flash-dashboad/flash-dashboad.component';
import { NotificationService } from '@app/@core';
import { UserManagement, USER_MANAGEMENTS, Report, REPORT, Mass, MASS } from '@app/shell/consts/model';
import { INDIVIDUAL, Individual } from '@app/shell/consts/model';
import { DOG_MANAGEMENTS, DogManagement } from '@app/shell/consts/model';
import { PET_MANAGEMENTS, PetManagement } from '../shell/consts/model';
import { DiseaseOutbreak, DISEASE_OUTBREAK } from '@app/shell/consts/model';
import { CERTIFICATE, Certificate } from '@app/shell/consts/model';
import { MasterService } from '@app/master-management/services/master.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  userManagements: UserManagement[] = USER_MANAGEMENTS;
  individuals: Individual[] = INDIVIDUAL;
  mass: Mass[] = MASS;
  dogDogManagements: DogManagement[] = DOG_MANAGEMENTS;
  petManagements: PetManagement[] = PET_MANAGEMENTS;
  diseaseOutBreaks: DiseaseOutbreak[] = DISEASE_OUTBREAK;
  certificates: Certificate[] = CERTIFICATE;
  reports: Report[] = REPORT;
  @Input() iconOnly = false;
  animal: string;
  name: string;
  public currentUser: Credentials;
  public routes: typeof routes = routes;
  createUser: boolean;
  searchbyPID: boolean;
  individualRegistration: boolean;
  dpm: boolean;
  mdv: boolean;
  petInfoRegistration: boolean;
  petInfoRenewalUpdate: boolean;
  petInfoOwnershipTansfer: boolean;
  petInfoPetInformation: boolean;
  flashReport: boolean;
  followUp: boolean;
  petCertificate: boolean;
  followUpreport: boolean;
  vaccineCertificate: boolean;
  breederStatus: boolean;
  searchMass: boolean;
  massRegistration: boolean;
  userDetails: any;
  id: number;
  currentUserName: string;
  jurisdiction: string;
  fullName: string;
  centre: string;
  dpmReports: boolean;
  petReport: boolean;
  massCertificate: boolean;
  isCenter: boolean;
  isAdmin = false;
  isReceptionist = false;
  isClinician = false;
  isEnumerator = false;
  isNCAH = false;
  isGuest = false;
  isDPMDV =false;

  constructor(
    private router: Router,
    private titleService: Title,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService,
    private masterService: MasterService,
    private media: MediaObserver,
    public dialog: MatDialog,
    private notification: NotificationService,
    private route: ActivatedRoute
  ) {}

  get username(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.employeename : null;
  }

  get role(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.role : null;
  }

  get isMobile(): boolean {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }

  get title(): string {
    return this.titleService.getTitle();
  }

  get roleName(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.roleName : null;
  }

  ngOnInit() {
    this.currentUser = this.credentialsService.credentials;
    this.id = this.credentialsService.credentials.userid;
    this.currentUserName = this.credentialsService.credentials.userName;
    this.currentUser = this.credentialsService.credentials;
    this.populateForm();
  }

  populateForm() {
    this.masterService.loadAllUserDetails(this.currentUserName).subscribe((res) => {
      this.userDetails = res;
     // console.log(res, 'reszdssfs');

      this.fullName = this.userDetails.fullName;
      localStorage.setItem('fullName', JSON.stringify(this.fullName));
      localStorage.setItem('forPopulatingProgram', JSON.stringify(this.userDetails));
      this.jurisdiction = this.userDetails.jurisdiction;
      this.centre = this.userDetails.centre.centre;

      if (this.centre === 'LEC/RNR-EC/CA' || this.centre === 'RLDC' || this.centre === 'TVH&SL') {
        this.isCenter = false;
      } else {
        this.isCenter = true;
      }
      localStorage.setItem('centre', JSON.stringify(this.centre));
      localStorage.setItem('jurisdiction', JSON.stringify(this.jurisdiction));

      for (let i = 0; i < this.userDetails.userRole.length; i++) {
        if (this.userDetails.userRole[i].role.roleName === 'Admin') {
          this.isAdmin = true;
        }
        if (this.userDetails.userRole[i].role.roleName === 'Receptionist') {
          this.isReceptionist = true;
        }
        if (this.userDetails.userRole[i].role.roleName === 'Clinician') {
          this.isClinician = true;
        }
        // if (this.userDetails.userRole[i].role.roleName === 'PIM/DPM/MDV') {
        //   this.isEnumerator = true;
        // }
        if (this.userDetails.userRole[i].role.roleName === 'DPMDV') {
          this.isDPMDV = true;
        }
        if (this.userDetails.userRole[i].role.roleName === 'NCAH') {
          this.isNCAH = true;
        }
        if (this.userDetails.userRole[i].role.roleName === 'Guest') {
          this.isGuest = true;
        }
      }
    });
  }

  signOut() {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
    localStorage.removeItem('jurisdiction');
    localStorage.removeItem('fullName');
    localStorage.removeItem('forPopulatingProgram');
    localStorage.removeItem('centre');  
    localStorage.removeItem('fetchedCID'); 
    localStorage.removeItem('credentials');  
    window.addEventListener("beforeunload", () => localStorage.removeItem('credentials'));
    window.addEventListener("beforeunload", () => localStorage.removeItem('jurisdiction'));
    window.addEventListener("beforeunload", () => localStorage.removeItem('fullName'));
    window.addEventListener("beforeunload", () => localStorage.removeItem('forPopulatingProgram'));
    window.addEventListener("beforeunload", () => localStorage.removeItem('centre'));
    window.addEventListener("beforeunload", () => localStorage.removeItem('fetchedCID'));

  }

  closeOthers() {
    this.searchbyPID = false;
    this.individualRegistration = false;
    this.dpm = false;
    this.mdv = false;
    this.petInfoRegistration = false;
    this.petInfoRenewalUpdate = false;
    this.petInfoOwnershipTansfer = false;
    this.petInfoPetInformation = false;
    this.flashReport = false;
    this.followUp = false;
    this.petCertificate = false;
    this.vaccineCertificate = false;
    this.breederStatus = false;
    this.dpmReports = false;
    this.petReport = false;
    this.followUp = false;
    this.searchMass = false;
    this.massRegistration = false;
  }

  openDialog(): void {
    this.dialog.open(MasterManagementComponent, {
      width: '630px',
      height: '490px',
    });
    this.createUser = false;
  }
  openDialogbox(): void {
    this.searchbyPID = false;
    this.individualRegistration = false;
    this.dpm = false;
    this.mdv = false;
    this.petInfoRegistration = true;
    this.petInfoRenewalUpdate = true;
    this.petInfoOwnershipTansfer = true;
    this.petInfoPetInformation = true;
    this.flashReport = false;
    this.followUp = false;
    this.petCertificate = false;
    this.vaccineCertificate = false;
    this.breederStatus = false;
    this.dpmReports = false;
    this.searchMass = false;
    this.massRegistration = false;
    this.massCertificate = false;
  }
  openDogManagement(): void {
    this.searchbyPID = false;
    this.individualRegistration = false;
    this.dpm = true;
    this.mdv = true;
    this.massCertificate = false;
    this.petInfoRegistration = false;
    this.petInfoRenewalUpdate = false;
    this.petInfoOwnershipTansfer = false;
    this.petInfoPetInformation = false;
    this.flashReport = false;
    this.followUp = false;
    this.petCertificate = false;
    this.vaccineCertificate = false;
    this.breederStatus = false;
    this.dpmReports = false;
    this.petReport = false;
    this.searchMass = false;
    this.massRegistration = false;
  }
  openUserManagement(): void {
    this.createUser = true;
  }

  openDiseaseOutbreak(): void {
    this.searchbyPID = false;
    this.individualRegistration = false;
    this.dpm = false;
    this.massCertificate = false;
    this.mdv = false;
    this.petInfoRegistration = false;
    this.petInfoRenewalUpdate = false;
    this.petInfoOwnershipTansfer = false;
    this.petInfoPetInformation = false;
    this.flashReport = true;
    this.followUp = true;
    this.petCertificate = false;
    this.vaccineCertificate = false;
    this.breederStatus = false;
    this.dpmReports = false;
    this.petReport = false;
    this.searchMass = false;
    this.massRegistration = false;
    this.massCertificate = false;
  }

  openMass() {
    this.searchbyPID = false;
    this.individualRegistration = false;
    this.dpm = false;
    this.mdv = false;
    this.petInfoRegistration = false;
    this.petInfoRenewalUpdate = false;
    this.petInfoOwnershipTansfer = false;
    this.petInfoPetInformation = false;
    this.flashReport = false;
    this.followUp = false;
    this.petCertificate = false;
    this.vaccineCertificate = false;
    this.breederStatus = false;
    this.petReport = false;
    this.dpmReports = false;
    this.petReport = false;
    this.searchMass = true;
    this.massRegistration = true;
    this.massCertificate = false;
  }

  refreshTheCurrentPage(clickedData: any) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([routes.MASS, clickedData]);
    });
  }

  flashReportPopup() {
    this.dialog.open(FlashDashboadComponent, {
      width: '70%',
      height: '590px',
      position: { top: '5%', left: '25%' },
      data: {
        actionType: 'Flash Report',
      },
    });
  }
  followUpPopup() {
    this.dialog.open(FlashDashboadComponent, {
      width: '70%',
      height: '590px',
      position: { top: '5%', left: '25%' },
      data: {
        actionType: 'FollowUp',
      },
    });
  }

  individualsButton(): void {
    this.searchbyPID = true;
    this.individualRegistration = true;
    this.dpm = false;
    this.mdv = false;
    this.petInfoRegistration = false;
    this.petInfoRenewalUpdate = false;
    this.petInfoOwnershipTansfer = false;
    this.petInfoPetInformation = false;
    this.flashReport = false;
    this.followUp = false;
    this.petCertificate = false;
    this.vaccineCertificate = false;
    this.breederStatus = false;
    this.dpmReports = false;
    this.petReport = false;
    this.searchMass = false;
    this.massRegistration = false;
    this.massCertificate = false;
  }

  OpenCertifacate(): void {
    this.searchbyPID = false;
    this.individualRegistration = false;
    this.dpm = false;
    this.mdv = false;
    this.petInfoRegistration = false;
    this.petInfoRenewalUpdate = false;
    this.petInfoOwnershipTansfer = false;
    this.petInfoPetInformation = false;
    this.flashReport = false;
    this.followUp = false;
    this.petCertificate = true;
    this.vaccineCertificate = true;
    this.breederStatus = true;
    this.dpmReports = false;
    this.petReport = false;
    this.searchMass = false;
    this.massRegistration = false;
    this.massCertificate = true;
  }
  openReports(): void {
    this.searchbyPID = false;
    this.individualRegistration = false;
    this.dpm = false;
    this.mdv = false;
    this.petInfoRegistration = false;
    this.petInfoRenewalUpdate = false;
    this.petInfoOwnershipTansfer = false;
    this.petInfoPetInformation = false;
    this.flashReport = false;
    this.followUp = false;
    this.petCertificate = false;
    this.vaccineCertificate = false;
    this.breederStatus = false;
    this.petReport = true;
    this.dpmReports = true;
    this.searchMass = false;
    this.massRegistration = false;
    this.massCertificate = false;
  }

  deleteSavedDraft() {
    localStorage.clear();
    this.notification.openSuccessSnackBar('Save draft data has been deleted');
    window.location.reload();
  }

  userProfile() {
    this.router.navigate([this.route.snapshot.queryParams.redirect || '/profile'], { replaceUrl: true });
  }
}
