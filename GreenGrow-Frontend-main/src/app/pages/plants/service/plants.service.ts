import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { User } from 'src/app/authentication/model/User';
import { TemplateService } from '../../../services/template.service';
import { Plants } from '../model/Plants';

@Injectable({
  providedIn: 'root',
})
export class PlantsService extends TemplateService<Plants> {
  constructor(http: HttpClient) {
    super(http);
    this.basePath = 'https://greengrowapi.onrender.com/api/plants'; // Cambia la ruta base a 'http://localhost:8080/api/plants'
  }

   // Actualiza el método getById para tomar el ID dinámicamente
   override getById(id: any): Observable<Plants> {
    let urlPath = `${this.basePath}/${id}`;
    return this.http
      .get<Plants>(urlPath, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  override  delete(id: any) {
    return this.http
      .delete(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}