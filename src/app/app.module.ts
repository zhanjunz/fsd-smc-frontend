import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatBadgeModule} from '@angular/material/badge';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatExpansionModule} from '@angular/material/expansion'; 
import {MatPaginatorModule} from '@angular/material/paginator'; 
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 
import {ChartsModule} from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { BodyDirective } from './directives/body.directive';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { AdminViewComponent } from './components/admin-view/admin-view.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { ImportDataComponent } from './components/import-data/import-data.component';
import { UploadStatusComponent } from './components/upload-status/upload-status.component';
import {MatTableModule} from '@angular/material/table';
import { UploadStatusDialogComponent } from './components/upload-status-dialog/upload-status-dialog.component';
import { ManageCompanyComponent } from './components/manage-company/manage-company.component';
import { ManageExchangeComponent } from './components/manage-exchange/manage-exchange.component';
import { ManageIpoComponent } from './components/manage-ipo/manage-ipo.component'; 
import {MatTooltipModule} from '@angular/material/tooltip';
import { ExchangeEditorDialogComponent } from './components/exchange-editor-dialog/exchange-editor-dialog.component';
import { IpoEditorDialogComponent } from './components/ipo-editor-dialog/ipo-editor-dialog.component';
import { CompanyEditorDialogComponent } from './components/company-editor-dialog/company-editor-dialog.component'; 
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { LineChartComponent } from './components/charts/line-chart/line-chart.component';
import { Export2excelComponent } from './components/export2excel/export2excel.component';
import { IpoViewDialogComponent } from './components/ipo-view-dialog/ipo-view-dialog.component';
import { CompanyViewDialogComponent } from './components/company-view-dialog/company-view-dialog.component';
import { ChartViewDialogComponent } from './components/chart-view-dialog/chart-view-dialog.component';
import { CompareCompanyDialogComponent } from './components/compare-company-dialog/compare-company-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    LoginPageComponent,
    BodyDirective,
    SignupPageComponent,
    AdminViewComponent,
    UserViewComponent,
    ImportDataComponent,
    UploadStatusComponent,
    UploadStatusDialogComponent,
    ManageCompanyComponent,
    ManageExchangeComponent,
    ManageIpoComponent,
    ExchangeEditorDialogComponent,
    IpoEditorDialogComponent,
    CompanyEditorDialogComponent,
    LineChartComponent,
    Export2excelComponent,
    IpoViewDialogComponent,
    CompanyViewDialogComponent,
    ChartViewDialogComponent,
    CompareCompanyDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTabsModule,
    MatBadgeModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatDialogModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatTableModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    ChartsModule
  ],
  entryComponents: [
    AppComponent, 
    LoginPageComponent, 
    SignupPageComponent, 
    UploadStatusDialogComponent,
    ExchangeEditorDialogComponent,
    IpoEditorDialogComponent,
    CompanyEditorDialogComponent,
    IpoViewDialogComponent,
    CompanyViewDialogComponent,
    ChartViewDialogComponent,
    CompareCompanyDialogComponent,
    LineChartComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
