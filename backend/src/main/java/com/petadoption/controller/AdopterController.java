package com.petadoption.controller;

import com.petadoption.entity.Adopter;
import com.petadoption.service.AdopterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/adopters")
@CrossOrigin(origins = "http://localhost:3001")
public class AdopterController {
    
    @Autowired
    private AdopterService adopterService;
    
    @GetMapping
    public ResponseEntity<List<Adopter>> getAllAdopters() {
        List<Adopter> adopters = adopterService.getAllAdopters();
        return ResponseEntity.ok(adopters);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Adopter> getAdopterById(@PathVariable Long id) {
        Optional<Adopter> adopter = adopterService.getAdopterById(id);
        return adopter.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Adopter> createAdopter(@RequestBody Adopter adopter) {
        try {
            Adopter createdAdopter = adopterService.createAdopter(adopter);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdAdopter);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Adopter> updateAdopter(@PathVariable Long id, @RequestBody Adopter adopterDetails) {
        Adopter updatedAdopter = adopterService.updateAdopter(id, adopterDetails);
        if (updatedAdopter != null) {
            return ResponseEntity.ok(updatedAdopter);
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAdopter(@PathVariable Long id) {
        boolean deleted = adopterService.deleteAdopter(id);
        if (deleted) {
            return ResponseEntity.ok("Adopter deleted successfully");
        } else {
            return ResponseEntity.badRequest().body("Cannot delete adopter. Please reassign their pets first.");
        }
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Adopter>> searchAdopters(@RequestParam(required = false) String name,
                                                       @RequestParam(required = false) String contact) {
        List<Adopter> adopters;
        if (name != null && !name.trim().isEmpty()) {
            adopters = adopterService.searchAdoptersByName(name);
        } else if (contact != null && !contact.trim().isEmpty()) {
            adopters = adopterService.searchAdoptersByContact(contact);
        } else {
            adopters = adopterService.getAllAdopters();
        }
        return ResponseEntity.ok(adopters);
    }
}
