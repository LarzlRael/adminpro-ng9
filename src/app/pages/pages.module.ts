import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routing';

import {FormsModule} from '@angular/forms';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';

// modulo de las graficas ng2-charts
import { ChartsModule } from 'ng2-charts';
import { GraficoDonasComponent } from './grafico-donas/grafico-donas.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PipesModule } from '../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        PipesModule,
        CommonModule
        
    ],
    declarations: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent,
        IncrementadorComponent,
        GraficoDonasComponent,
        AccountSettingsComponent,
        RxjsComponent,
        ProfileComponent
        
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent,
        IncrementadorComponent,
        SharedModule,
    ],
    providers: [],
})
export class PagesModule { }
