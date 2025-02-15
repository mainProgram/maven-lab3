package com.isi.maven.services.dao;

import com.isi.maven.services.entities.AppRolesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IAppRolesRepository extends JpaRepository<AppRolesEntity, Integer> {

    Optional<AppRolesEntity> findByNom(String nom);
}
