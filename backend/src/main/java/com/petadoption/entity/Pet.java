package com.petadoption.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "pets")
public class Pet {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Name is required")
    @Size(max = 100, message = "Name must not exceed 100 characters")
    @Column(nullable = false)
    private String name;
    
    @NotBlank(message = "Type is required")
    @Size(max = 50, message = "Type must not exceed 50 characters")
    @Column(nullable = false)
    private String type;
    
    @NotBlank(message = "Breed is required")
    @Size(max = 100, message = "Breed must not exceed 100 characters")
    @Column(nullable = false)
    private String breed;
    
    @Column(nullable = false)
    private Boolean adopted = false;
    
    @Column(nullable = false)
    private Boolean breedable = false;
    
    @Size(max = 255, message = "Diseases must not exceed 255 characters")
    private String diseases;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "adopter_id")
    private Adopter adopter;
    
    // Constructors
    public Pet() {}
    
    public Pet(String name, String type, String breed, Boolean adopted, Boolean breedable, String diseases) {
        this.name = name;
        this.type = type;
        this.breed = breed;
        this.adopted = adopted;
        this.breedable = breedable;
        this.diseases = diseases;
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
    
    public String getType() {
        return type;
    }
    
    public void setType(String type) {
        this.type = type;
    }
    
    public String getBreed() {
        return breed;
    }
    
    public void setBreed(String breed) {
        this.breed = breed;
    }
    
    public Boolean getAdopted() {
        return adopted;
    }
    
    public void setAdopted(Boolean adopted) {
        this.adopted = adopted;
    }
    
    public Boolean getBreedable() {
        return breedable;
    }
    
    public void setBreedable(Boolean breedable) {
        this.breedable = breedable;
    }
    
    public String getDiseases() {
        return diseases;
    }
    
    public void setDiseases(String diseases) {
        this.diseases = diseases;
    }
    
    public Adopter getAdopter() {
        return adopter;
    }
    
    public void setAdopter(Adopter adopter) {
        this.adopter = adopter;
    }
}
