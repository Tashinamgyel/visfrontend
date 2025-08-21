import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { PetCertificateComponent } from '@app/vis/certificate/compoments/pet-certificate/pet-certificate.component';
import { PetHealthCertificateComponent } from '@app/vis/pet-registration/component/pet-health-certificate/pet-health-certificate.component';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { SearchComponent } from '../vis/search/search/search.component';
import { DashboardComponent } from './container/dashboard/dashboard.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent, data: { title: marker('Dashboard') } },
    { path: 'search', component: SearchComponent, data: { title: marker('Search') } },
    //  { path: '/petHealth', component: PetHealthCertificateComponent, data: { title: marker('Search') } },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
