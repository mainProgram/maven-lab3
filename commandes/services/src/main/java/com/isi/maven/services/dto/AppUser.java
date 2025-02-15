package com.isi.maven.services.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppUser {
    private int id;

    @NotNull(message = "Le nom est requis.")
    private String nom;

    @NotNull(message = "Le prenom est requis.")
    private String prenom;

    @NotNull(message = "L'email est requis.")
    private String email;

    @NotNull(message = "Le mot de passe est requis.")
    private String password;

    @NotEmpty(message = "Le rôle est requis.")
    private List<AppRoles> appRoleEntities;

    @NotNull
    private int etat = 1;

}
