import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Profile, UpdateUserDto } from '../interface/profile';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl =  `${environment.apiUrl}/Auth`;

  constructor(private http: HttpClient) {}

    getUserDetail(): Observable<Profile> { 
      return this.http.get<Profile>(`${this.apiUrl}/detail`);
    }

    updateUser(updateUser: UpdateUserDto): Observable<any> {
      return this.http.put(`${this.apiUrl}/update`, updateUser, { responseType: 'text' });
    }

}
