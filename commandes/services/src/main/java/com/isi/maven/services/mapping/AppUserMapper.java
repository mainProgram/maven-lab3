package com.isi.maven.services.mapping;

import com.isi.maven.services.dto.AppUser;
import com.isi.maven.services.entities.AppUserEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AppUserMapper {

    AppUserEntity fromAppUser(AppUser appUser);

    AppUser toAppUser(AppUserEntity appUserEntity);

    List<AppUser> toAppUsers(List<AppUserEntity> appUserEntities);
}
