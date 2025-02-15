package com.isi.maven.services.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Produit {
    private int id;

    @NotBlank(message = "Le nom est requis.")
    private String nom;

    @NotNull(message = "La quantité en stock est requise.")
    @Min(value = 0, message = "La quantité ne peut pas être négative")
    private double qtStock;

    @NotNull(message = "Le user est requis.")
    private int appUserId;
}
