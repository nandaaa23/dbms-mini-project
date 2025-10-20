package com.petadoption.repository;

import com.petadoption.entity.Adopter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdopterRepository extends JpaRepository<Adopter, Long> {
    
    List<Adopter> findByNameContainingIgnoreCase(String name);
    
    List<Adopter> findByContactContaining(String contact);
    
    @Query("SELECT a FROM Adopter a LEFT JOIN FETCH a.pets WHERE a.id = :id")
    Adopter findByIdWithPets(Long id);
    
    @Query("SELECT a FROM Adopter a LEFT JOIN FETCH a.pets")
    List<Adopter> findAllWithPets();
}
