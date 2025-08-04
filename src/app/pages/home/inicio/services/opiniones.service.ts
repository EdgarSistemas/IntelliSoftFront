import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class OpinionesService {

  constructor(private http: HttpClient) {} 
  
  obetenerOpiniones(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/opinion/getall`);
  }

}
