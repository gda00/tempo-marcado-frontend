// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Agendamento } from './components/agendamento/agendamento';
import { authGuard } from './guards/auth-guard';
import { MinhasReservasComponent } from './components/minhas-reservas/minhas-reservas';
import { adminGuard } from './guards/admin-guard';
import { GerenciarUsuariosComponent } from './components/admin/gerenciar-usuarios/gerenciar-usuarios';
import { GerenciarSalasComponent } from './components/admin/gerenciar-salas/gerenciar-salas';
import { GerenciarReservasComponent } from './components/admin/gerenciar-reservas/gerenciar-reservas';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  {
    path: 'agendamento',
    component: Agendamento,
    canActivate: [authGuard]
  },
  {
    path: 'minhas-reservas',
    component: MinhasReservasComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin', 
    canActivate: [adminGuard],
    children: [
      { path: 'usuarios', component: GerenciarUsuariosComponent },
      { path: 'salas', component: GerenciarSalasComponent }
    ]
  },
  { 
    path: 'admin', 
    canActivate: [adminGuard],
    children: [
      { path: 'usuarios', component: GerenciarUsuariosComponent },
      { path: 'salas', component: GerenciarSalasComponent },
      { path: 'reservas', component: GerenciarReservasComponent }
    ]
  }
];