import { Routes } from '@angular/router';
import { GetUsersComponent } from './get-users/get-users.component';

export const routes: Routes = [
    {path:"",component:GetUsersComponent},
    {path:"getusers",component:GetUsersComponent}
];
