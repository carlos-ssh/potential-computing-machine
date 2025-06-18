import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
// import { InvoicesComponent } from './invoices.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Header,
    Footer
    // InvoicesComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'invoices_app';
}
