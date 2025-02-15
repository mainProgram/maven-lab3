import {Injectable} from '@angular/core';
import {map, tap} from 'rxjs';
import {ResourceService} from './resource.service';
import {IApiResponse} from '../models/api-response';
import {AppRoles} from "../models/app-roles.model";
let baseUrl = "http://localhost:8080/roles"

@Injectable({
  providedIn: 'root'
})
export class AppRoleService extends ResourceService<AppRoles>{

  fetchAppRoles() {
    return this.http
      .get<IApiResponse>(baseUrl)
      .pipe(
        map((response) => response as AppRoles[]),
        tap(this.setResources.bind(this))
      );
  }

  addAppRole(appRole: AppRoles) {
    return this.http
      .post<IApiResponse>(baseUrl, appRole)
      .pipe(
        map((response) => response as AppRoles[]),
        tap(this.setResources.bind(this))
      );
  }

  getAppRole(id: number) {
    return this.http
      .get<IApiResponse>(baseUrl+ "/"+ id)
  }

  deleteAppRole(id: number) {
    return this.http
      .delete<IApiResponse>(`${baseUrl}/${id}`)
      .pipe(tap(() => this.removeResource(id)));
  }

  updateAppRole(id:number, appRole: AppRoles) {
    return this.http
      .put<IApiResponse>(`${baseUrl}/${id}`, appRole)
      .pipe(
        map((response) => response as AppRoles[]),
        tap(this.setResources.bind(this))
      );
  }
}
