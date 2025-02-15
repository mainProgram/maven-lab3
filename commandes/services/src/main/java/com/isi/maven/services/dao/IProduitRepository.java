package com.isi.maven.services.dao;

import com.isi.maven.services.entities.ProduitEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IProduitRepository extends JpaRepository<ProduitEntity, Integer> {

    Optional<ProduitEntity> findByNom(String nom);
}
