import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Footer } from "./shared/components/footer/footer";
import { Header } from "./shared/components/header/header";
import { ErrorNotification } from './shared/components/error-notification/error-notification';

 
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterModule, CommonModule, Footer, Header, ErrorNotification],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}
