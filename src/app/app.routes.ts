import { Routes } from '@angular/router';
import { InvoicesComponent } from './components/invoices/invoices.component';

export const routes: Routes = [
  { path: '', redirectTo: 'invoices', pathMatch: 'full' },
  { path: 'invoices', component: InvoicesComponent }
];
