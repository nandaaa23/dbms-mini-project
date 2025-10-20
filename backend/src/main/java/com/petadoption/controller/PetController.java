package com.petadoption.controller;

import com.petadoption.entity.Pet;
import com.petadoption.service.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/pets")
@CrossOrigin(origins = "http://localhost:3001")
public class PetController {
    
    @Autowired
    private PetService petService;
    
    @GetMapping
    public ResponseEntity<List<Pet>> getAllPets() {
        List<Pet> pets = petService.getAllPets();
        return ResponseEntity.ok(pets);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Pet> getPetById(@PathVariable Long id) {
        Optional<Pet> pet = petService.getPetById(id);
        return pet.map(ResponseEntity::ok)
                 .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Pet> createPet(@RequestBody Pet pet) {
        try {
            Pet createdPet = petService.createPet(pet);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdPet);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Pet> updatePet(@PathVariable Long id, @RequestBody Pet petDetails) {
        Pet updatedPet = petService.updatePet(id, petDetails);
        if (updatedPet != null) {
            return ResponseEntity.ok(updatedPet);
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePet(@PathVariable Long id) {
        boolean deleted = petService.deletePet(id);
        if (deleted) {
            return ResponseEntity.ok("Pet deleted successfully");
        }
        return ResponseEntity.notFound().build();
    }
    
    @GetMapping("/adopted/{adopted}")
    public ResponseEntity<List<Pet>> getPetsByAdoptionStatus(@PathVariable Boolean adopted) {
        List<Pet> pets = petService.getPetsByAdoptionStatus(adopted);
        return ResponseEntity.ok(pets);
    }
    
    @GetMapping("/type/{type}")
    public ResponseEntity<List<Pet>> getPetsByType(@PathVariable String type) {
        List<Pet> pets = petService.getPetsByType(type);
        return ResponseEntity.ok(pets);
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Pet>> searchPets(@RequestParam(required = false) String name,
                                               @RequestParam(required = false) String breed,
                                               @RequestParam(required = false) String type,
                                               @RequestParam(required = false) Boolean adopted) {
        List<Pet> pets;
        
        if (name != null && !name.trim().isEmpty()) {
            pets = petService.searchPetsByName(name);
        } else if (breed != null && !breed.trim().isEmpty()) {
            pets = petService.searchPetsByBreed(breed);
        } else if (type != null && !type.trim().isEmpty()) {
            pets = petService.getPetsByType(type);
        } else if (adopted != null) {
            pets = petService.getPetsByAdoptionStatus(adopted);
        } else {
            pets = petService.getAllPets();
        }
        
        return ResponseEntity.ok(pets);
    }
    
    @PostMapping("/{petId}/adopt/{adopterId}")
    public ResponseEntity<Pet> adoptPet(@PathVariable Long petId, @PathVariable Long adopterId) {
        Pet adoptedPet = petService.adoptPet(petId, adopterId);
        if (adoptedPet != null) {
            return ResponseEntity.ok(adoptedPet);
        }
        return ResponseEntity.badRequest().build();
    }
    
    @PostMapping("/{petId}/unadopt")
    public ResponseEntity<Pet> unadoptPet(@PathVariable Long petId) {
        Pet unadoptedPet = petService.unadoptPet(petId);
        if (unadoptedPet != null) {
            return ResponseEntity.ok(unadoptedPet);
        }
        return ResponseEntity.badRequest().build();
    }
}
