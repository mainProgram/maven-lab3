import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rolePipe',
  standalone: true
})
export class RolePipePipe implements PipeTransform {

  transform(value: string|undefined): any {
    if (!value) {
      return 'N/A';
    }
    if (value == "ROLE_ADMIN") {
      return "Administrateur"
    } else if (value == "ROLE_SUPER_ADMIN") {
      return "Super Administrateur"
    } else if (value == "ROLE_PRACTITIONER") {
      return "Médecin"
    } else if (value == "ROLE_USER") {
      return "Utilisateur"
    }
  }
}
