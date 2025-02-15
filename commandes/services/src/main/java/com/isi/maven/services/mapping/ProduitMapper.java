package com.isi.maven.services.mapping;

import com.isi.maven.services.dto.Produit;
import com.isi.maven.services.entities.ProduitEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProduitMapper {
    Produit toProduit(ProduitEntity produitEntity);
    ProduitEntity fromProduit(Produit produit);
}
