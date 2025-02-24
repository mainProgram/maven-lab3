import {Injectable} from '@angular/core';
import {map, tap} from 'rxjs';
import {ResourceService} from './resource.service';
import {AppRoles} from "../models/app-roles.model";
let baseUrl = "http://localhost:8086/roles"

@Injectable({
  providedIn: 'root'
})
export class AppRoleService extends ResourceService<AppRoles>{

  fetchAppRoles() {
    return this.http
      .get<AppRoles[]>(baseUrl)
      .pipe(
        map((response) => response as AppRoles[]),
        tap(this.setResources.bind(this))
      );
  }

  addAppRole(appRole: AppRoles) {
    return this.http
      .post<AppRoles>(baseUrl, appRole)
      .pipe(
        tap((newAppRole) => this.upsertResource(newAppRole))
      );
  }

  getAppRole(id: number) {
    return this.http
      .get<AppRoles>(baseUrl+ "/"+ id)
  }

  deleteAppRole(id: number) {
    return this.http
      .delete<AppRoles>(`${baseUrl}/${id}`)
      .pipe(tap(() => this.removeResource(id)));
  }

  updateAppRole(id:number, appRole: AppRoles) {
    return this.http
      .put<AppRoles>(`${baseUrl}/${id}`, appRole)
      .pipe(
        tap((newAppRole) => this.upsertResource(newAppRole))
      );
  }
}
