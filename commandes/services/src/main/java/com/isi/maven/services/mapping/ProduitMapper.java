package com.isi.maven.services.mapping;

import com.isi.maven.services.dto.Produit;
import com.isi.maven.services.entities.ProduitEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProduitMapper {
    @Mapping(target = "appUserId", source = "appUserEntity.id")
    Produit toProduit(ProduitEntity produitEntity);

    ProduitEntity fromProduit(Produit produit);
}
