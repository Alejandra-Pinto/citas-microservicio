import { Component } from '@angular/core';
import { Header } from "../components/headerHome/header";
import { PorQueElegir } from '../components/por-que-elegir/por-que-elegir';
import { Horario } from '../components/horario/horario';
import { Mapa } from '../components/mapa/mapa';
import { Footer } from '../../../shared/components/footer/footer';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Header, PorQueElegir, Horario, Mapa, Footer, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
