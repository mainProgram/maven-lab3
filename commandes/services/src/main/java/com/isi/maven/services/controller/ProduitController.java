package com.isi.maven.services.controller;

import com.isi.maven.services.dto.Produit;
import com.isi.maven.services.services.ProduitService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/produits")
@AllArgsConstructor
@Validated
public class ProduitController {
    private ProduitService produitService;

    @GetMapping
    public List<Produit> getProduit() {
        return produitService.getAllProduits();
    }

    @GetMapping("/{id}")
    public Produit getProduit(@PathVariable("id") int id) {
        return produitService.getOneProduit(id);
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Produit createProduit(@Valid @RequestBody Produit produit) {
        return produitService.createProduit(produit);
    }

    @PutMapping("/{id}")
    public Produit updateProduit(@PathVariable("id") int id, @Valid @RequestBody Produit produit) {
        return produitService.updateProduit(id, produit);
    }

    @DeleteMapping("/{id}")
    public void deleteProduit(@PathVariable("id") int id) {
        produitService.deleteProduit(id);
    }
}
