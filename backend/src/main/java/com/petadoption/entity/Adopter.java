package com.petadoption.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "adopters")
public class Adopter {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Name is required")
    @Size(max = 100, message = "Name must not exceed 100 characters")
    @Column(nullable = false)
    private String name;
    
    @NotBlank(message = "Contact is required")
    @Size(max = 50, message = "Contact must not exceed 50 characters")
    @Column(nullable = false)
    private String contact;
    
    @NotBlank(message = "Address is required")
    @Size(max = 255, message = "Address must not exceed 255 characters")
    @Column(nullable = false)
    private String address;
    
    @OneToMany(mappedBy = "adopter", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Pet> pets = new ArrayList<>();
    
    // Constructors
    public Adopter() {}
    
    public Adopter(String name, String contact, String address) {
        this.name = name;
        this.contact = contact;
        this.address = address;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getContact() {
        return contact;
    }
    
    public void setContact(String contact) {
        this.contact = contact;
    }
    
    public String getAddress() {
        return address;
    }
    
    public void setAddress(String address) {
        this.address = address;
    }
    
    public List<Pet> getPets() {
        return pets;
    }
    
    public void setPets(List<Pet> pets) {
        this.pets = pets;
    }
    
    // Helper methods
    public void addPet(Pet pet) {
        pets.add(pet);
        pet.setAdopter(this);
    }
    
    public void removePet(Pet pet) {
        pets.remove(pet);
        pet.setAdopter(null);
    }
}
