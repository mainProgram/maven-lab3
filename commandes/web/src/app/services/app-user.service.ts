import {Injectable} from '@angular/core';
import {map, tap} from 'rxjs';
import {ResourceService} from './resource.service';
import {IApiResponse} from '../models/api-response';
import {AppUser} from "../models/app-user.model";
let baseUrl = "http://localhost:8080/users"

@Injectable({
  providedIn: 'root'
})
export class AppUserService extends ResourceService<AppUser>{

  fetchAppUsers() {
    return this.http
      .get<IApiResponse>(baseUrl)
      .pipe(
        map((response) => response as AppUser[]),
        tap(this.setResources.bind(this))
      );
  }

  addAppUser(appUser: AppUser) {
    return this.http
      .post<IApiResponse>(baseUrl, appUser)
      .pipe(
        map((response) => response as AppUser[]),
        tap(this.setResources.bind(this))
      );
  }

  getAppUser(id: string) {
    return this.http
      .get<IApiResponse>(baseUrl+ "/"+ id)
  }

  deleteAppUser(id: string) {
    return this.http
      .delete<IApiResponse>(`${baseUrl}/${id}`)
      .pipe(tap(() => this.removeResource(id)));
  }

  updateAppUser(id:string, appUser: AppUser) {
    return this.http
      .put<IApiResponse>(`${baseUrl}/${id}`, appUser)
      .pipe(
        map((response) => response as AppUser[]),
        tap(this.setResources.bind(this))
      );
  }
}
