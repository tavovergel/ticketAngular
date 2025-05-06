import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface Evento {
  id: string;
  nombre: string;
  imagen: string;
  detalles?: string;
  width?: string;
  height?: string;
  className?: string;
  gridClasses?: string;
}

interface Festival {
  id?: string;
  nombre: string;
  ubicacion: string;
  fechas: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  tituloPrincipal = '¡BIENVENIDO A TU CONCIERTO YA!';
  subtituloPrincipal = 'La música te espera, tu entrada está aquí.';
  tituloRelevantes = 'RELEVANTES';
  eventosRelevantes: Evento[] = [
    {
      id: 'evento_stereo_2025',
      nombre: 'FESTIVAL ESTÉREO PICNIC 2025',
      imagen: 'assets/Estereo_Picnic 1.png',
      detalles: '13',
      width: '198',
      height: '295',
      className: 'w-48 h-72',
      gridClasses: 'col-span-4 col-start-1 row-start-1'
    },
    {
      id: 'evento_shakira_2025',
      nombre: 'SHAKIRA',
      imagen: 'assets/Shakira 1.png',
      detalles: '13',
      width: '198',
      height: '295',
      className: 'w-48 h-72',
      gridClasses: 'row-span-2 col-start-1 row-start-2'
    },
    {
      id: 'evento_reyruiz_2025',
      nombre: 'REY RUIZ',
      imagen: 'assets/rey-ruiz-siempre-contigo-4 1.png',
      detalles: '09 MAYO',
      width: '198',
      height: '295',
      className: 'w-48 h-72',
      gridClasses: 'col-start-2 row-start-2'
    },
    {
      id: 'evento_francophonie_2025',
      nombre: 'FESTIVAL DE LA FRANCOPHONIE',
      imagen: 'assets/la_francophonie 1.png',
      detalles: '15 DE MAYO',
      width: '198',
      height: '295',
      className: 'w-48 h-72',
      gridClasses: 'col-start-2 row-start-3'
    },
    {
      id: "evento_andrescalamaro_2025",
      nombre: 'ANDRÉS CALAMARO: TOUR 2025',
      imagen: 'assets/Andres_Calamaro 1.png',
      width: '198',
      height: '295',
      className: 'w-48 h-72',
      gridClasses: 'row-span-2 col-start-3 row-start-2'
    },
    {
      id: "evento_fonseca_2025",
      nombre: 'FONSECA: VIAJANTE TOUR',
      imagen: 'assets/fonseca-tropicalia-tour-tercera-fecha-6 1.png',
      detalles: '¡SE ACERCAN LOS DÍAS PARA SENTIR DE NUEVO QUE ESTAMOS VIVXS! A PARTIR DEL 20 DE MARZO AL MEDIODÍA, EL ENVÍO DE MANILLAS YA NO ESTARÁ DISPONIBLE.',
      width: '198',
      height: '295',
      className: 'w-48 h-72',
      gridClasses: 'col-start-4 row-start-2'
    },
    {
      id: "evento_metallica_2025",
      nombre: 'METALLICA',
      imagen: 'assets/metallica-vs-guns-n-roses-filarmonico-8 1.png',
      detalles: 'GRANDES ÉXITOS',
      width: '198',
      height: '295',
      className: 'w-48 h-72',
      gridClasses: 'col-start-4 row-start-3'
    },
    {
      id: 'evento_baum_2025',
      nombre: 'BAUM FESTIVAL',
      imagen: 'assets/BAUM 1.png',
      detalles: 'GRANDES ÉXITOS',
      width: '198',
      height: '295',
      className: 'w-48 h-72',
      gridClasses: 'col-span-4 col-start-1 row-start-4'
    }
  ];

  constructor(private readonly http: HttpClient) {}

  getEventos(): Observable<any> {
    return this.http.get('/assets/concierts.json');
  }

  getEventoById(id: string): Observable<any> {
    return new Observable(observer => {
      this.getEventos().subscribe(eventos => {
        const evento = eventos.find((e: any) => e.id === id);
        observer.next(evento);
        observer.complete();
      });
    });
  }
}
