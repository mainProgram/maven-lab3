package com.isi.maven.services.dao;

import com.isi.maven.services.entities.AppUserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IAppUserRepository extends JpaRepository<AppUserEntity, Integer> {
    Optional<AppUserEntity> findByEmail(String email);
}
