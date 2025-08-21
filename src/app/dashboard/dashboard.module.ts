import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './container/dashboard/dashboard.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/@shared';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';
import { StatsComponent } from './components/stats/stats.component';
import { DiseaseOutbreakComponent } from './components/disease-outbreak/disease-outbreak.component';
import { SearchComponent } from '../vis/search/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchResultsComponent } from '@app/vis/search/search-results/search-results.component';
import { RegisteredDetailsComponent } from '@app/vis/search/registered-details/registered-details.component';
import { VisModule } from '@app/vis/vis.module';
import { MatTableExporterModule } from 'mat-table-exporter';
// import { MapComponent } from '@app/vis/Report/components/map/map.component';

@NgModule({
  declarations: [
    DashboardComponent,
    StatsComponent,
    DiseaseOutbreakComponent,
    SearchComponent,
    SearchResultsComponent,
    RegisteredDetailsComponent,
  ],

  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    VisModule,
    MatTableExporterModule,
  ],
})
export class DashboardModule {}
