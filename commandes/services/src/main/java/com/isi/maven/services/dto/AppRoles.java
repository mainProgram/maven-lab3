package com.isi.maven.services.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppRoles {
    private int id;

    @NotNull(message = "Le nom est requis.")
    private String nom;

}
