import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Automovil } from './models';
import { catchError, tap } from 'rxjs/operators';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class AutosService {
  private autosURL = 'https://catalogo-autos.herokuapp.com/api/autos';
  private autosActionURL = 'https://catalogo-autos.herokuapp.com/api/autos';
  constructor(private http: HttpClient, private messagesServices: MessagesService) { }

  getAutos(): Observable<any>{
    return this.http.get<any>(this.autosURL).pipe(
      catchError(this.handleError<any>('getAutos')),
      tap(()=>this.messagesServices.add('Autos Obtenidos'))
    )
  }

  updateAutos(auto: Automovil): Observable<any>{
    return this.http.put<any>(`${this.autosURL}/${auto._id}`, auto).pipe(
      catchError(this.handleError<any>('updateAuto')),
      tap((result)=>{
        console.log(result);
        this.messagesServices.add(`Auto editado con id: ${result.data._id}`)
      })
    )

  }

  deleteAuto(auto: Automovil): Observable<any>{
    return this.http.delete<any>(`${this.autosActionURL}/${auto._id}`).pipe(
      catchError(this.handleError<any>('deleteAuto')),
      tap((result)=>{
        console.log(result);
        this.messagesServices.add(`Auto eliminado con id: ${auto._id}`)
      })
    )
  }

  addAuto(auto: Automovil): Observable<any>{
    return this.http.post<any>(`${this.autosActionURL}?${auto._id}`,auto).pipe(
      catchError(this.handleError<any>('addAuto')),
      tap((result)=>{
        console.log(result);
        this.messagesServices.add(`Auto agregado con id: ${result.data._id}`)
      })
    )
  }

  private handleError<T>(operation="operacion",result?: T){
    return (error: any): Observable <T> =>{
     this.messagesServices.add(`${operation} fallo:${error.message}`);
     return of(result as T);
    }
  }
}
