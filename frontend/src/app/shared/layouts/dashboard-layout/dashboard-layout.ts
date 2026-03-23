import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Sidebar } from '../../components/sidebar/sidebar';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, Sidebar],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.scss',
})
export class DashboardLayoutComponent {}
