package com.isi.maven.services.services;

import com.isi.maven.services.dao.IAppUserRepository;
import com.isi.maven.services.dao.IProduitRepository;
import com.isi.maven.services.dto.Produit;
import com.isi.maven.services.entities.AppUserEntity;
import com.isi.maven.services.entities.ProduitEntity;
import com.isi.maven.services.exception.EntityExistsException;
import com.isi.maven.services.exception.EntityNotFoundException;
import com.isi.maven.services.exception.RequestException;
import com.isi.maven.services.mapping.ProduitMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class ProduitService {
    private final IProduitRepository iProduitRepository;
    private final IAppUserRepository iAppUserRepository;
    private final ProduitMapper produitMapper;
    private final MessageSource messageSource;

    @Transactional(readOnly = true)
    public List<Produit> getAllProduits() {
        return StreamSupport.stream(iProduitRepository.findAll().spliterator(), false)
                .map(produitMapper::toProduit)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Produit getOneProduit(int id) {
        return produitMapper.toProduit(iProduitRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException(messageSource.getMessage("produit.notfound", new Object[]{id},
                                Locale.getDefault()))));
    }

    @Transactional
    public Produit createProduit(Produit produit) {
        if (iProduitRepository.findByNom(produit.getNom()).isPresent()) {
            throw new EntityExistsException(
                    messageSource.getMessage("produit.exists",
                            new Object[]{produit.getNom()},
                            Locale.getDefault())
            );
        }
        AppUserEntity user = iAppUserRepository.findById(produit.getAppUserId())
                    .orElseThrow(() -> new EntityNotFoundException(
                            messageSource.getMessage("user.notfound", new Object[]{produit.getAppUserId()}, Locale.getDefault())));

        ProduitEntity savedProduit = produitMapper.fromProduit(produit);
        savedProduit.setAppUserEntity(user);
        savedProduit = iProduitRepository.save(savedProduit);

        return produitMapper.toProduit(savedProduit);
    }

    @Transactional
    public Produit updateProduit(int id, Produit produit) {
        return iProduitRepository.findById(id)
                .map(entity -> {
                    produit.setId(id);
                    return produitMapper.toProduit(
                            iProduitRepository.save(produitMapper.fromProduit(produit)));
                }).orElseThrow(() -> new EntityNotFoundException(messageSource.getMessage("produit.notfound", new Object[]{id},
                        Locale.getDefault())));
    }

    @Transactional
    public void deleteProduit(int id) {
        getOneProduit(id);
        try {
            iProduitRepository.deleteById(id);
        } catch (Exception e) {
            throw new RequestException(messageSource.getMessage("produit.errordeletion", new Object[]{id},
                    Locale.getDefault()),
                    HttpStatus.CONFLICT);
        }
    }
}

