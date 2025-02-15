import {AppRoles} from "./app-roles.model";

export interface AppUser {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  password: number;
  etat: number;
  appRoleEntities: AppRoles[];
}
