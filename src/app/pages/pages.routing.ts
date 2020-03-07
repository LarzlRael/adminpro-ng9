import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { LoginGuardGuard, AdminGuard, VerificaTokenGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

const pagesRoutes: Routes = [


    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [VerificaTokenGuard],
        data: { titulo: 'dashboard' }
    },
    { path: 'progress', component: ProgressComponent },
    { path: 'grafica1', component: Graficas1Component },
    { path: 'account-settings', component: AccountSettingsComponent },
    { path: 'rxjs', component: RxjsComponent },
    { path: 'profile', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
    //mantenimmiento

    {
        path: 'usuarios',
        component: UsuariosComponent,
        data: { titulo: 'Mantenimiento de usuarios' },
        canActivate: [AdminGuard]
    },


    { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de Hospitales' } },
    { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de medicos' } },
    { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar Medico' } },
    { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Busqueda' } },

    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
