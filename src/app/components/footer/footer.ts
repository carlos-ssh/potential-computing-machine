import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  protected year: number = new Date().getFullYear();
  protected author: string = 'Sistema de Facturas';
  protected company: string = 'Mi Empresa';
  protected version: string = '1.0.0';
  protected contactEmail: string = 'info@facturas.com'
}
