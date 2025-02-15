package com.isi.maven.services.mapping;

import com.isi.maven.services.dto.Produit;
import com.isi.maven.services.entities.AppUserEntity;
import com.isi.maven.services.entities.ProduitEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProduitMapper {
    @Mapping(target = "appUserId", source = "appUserEntity.id")
    Produit toProduit(ProduitEntity produitEntity);

    @Mapping(target = "appUserEntity", source = "produit.appUserId")
    ProduitEntity fromProduit(Produit produit);

    default AppUserEntity map(int appUserId) {
        AppUserEntity appUserEntity = new AppUserEntity();
        appUserEntity.setId(appUserId);
        return appUserEntity;
    }
}
