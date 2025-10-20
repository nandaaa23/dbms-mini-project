package com.petadoption.repository;

import com.petadoption.entity.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {
    
    List<Pet> findByAdopted(Boolean adopted);
    
    List<Pet> findByType(String type);
    
    List<Pet> findByBreedContainingIgnoreCase(String breed);
    
    List<Pet> findByNameContainingIgnoreCase(String name);
    
    @Query("SELECT p FROM Pet p LEFT JOIN FETCH p.adopter WHERE p.id = :id")
    Pet findByIdWithAdopter(Long id);
    
    @Query("SELECT p FROM Pet p LEFT JOIN FETCH p.adopter")
    List<Pet> findAllWithAdopter();
    
    @Query("SELECT p FROM Pet p LEFT JOIN FETCH p.adopter WHERE p.adopted = :adopted")
    List<Pet> findByAdoptedWithAdopter(Boolean adopted);
}
