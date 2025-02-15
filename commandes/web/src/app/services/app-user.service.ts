import {Injectable} from '@angular/core';
import {map, tap} from 'rxjs';
import {ResourceService} from './resource.service';
import {AppUser} from "../models/app-user.model";
let baseUrl = "http://localhost:8080/users"

@Injectable({
  providedIn: 'root'
})
export class AppUserService extends ResourceService<AppUser>{

  fetchAppUsers() {
    return this.http
      .get<AppUser[]>(baseUrl)
      .pipe(
        map((response) => response as AppUser[]),
        tap(this.setResources.bind(this))
      );
  }

  addAppUser(appUser: AppUser) {
    return this.http
      .post<AppUser>(baseUrl, appUser)
      .pipe(
        map((response) => response as any),
        tap(this.setResources.bind(this))
      );
  }

  getAppUser(id: number) {
    return this.http
      .get<AppUser>(baseUrl+ "/"+ id)
  }

  deleteAppUser(id: number) {
    return this.http
      .delete<AppUser>(`${baseUrl}/${id}`)
      .pipe(tap(() => this.removeResource(id)));
  }

  updateAppUser(id:number, appUser: AppUser) {
    return this.http
      .put<AppUser>(`${baseUrl}/${id}`, appUser)
      .pipe(
        map((response) => response as any),
        tap(this.setResources.bind(this))
      );
  }
}
