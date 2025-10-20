package com.petadoption.service;

import com.petadoption.entity.Adopter;
import com.petadoption.entity.Pet;
import com.petadoption.repository.AdopterRepository;
import com.petadoption.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PetService {
    
    @Autowired
    private PetRepository petRepository;
    
    @Autowired
    private AdopterRepository adopterRepository;
    
    public List<Pet> getAllPets() {
        return petRepository.findAllWithAdopter();
    }
    
    public Optional<Pet> getPetById(Long id) {
        return petRepository.findById(id);
    }
    
    public Pet createPet(Pet pet) {
        // If pet is adopted and has adopterId, set the adopter
        if (pet.getAdopted() && pet.getAdopter() != null && pet.getAdopter().getId() != null) {
            Optional<Adopter> adopter = adopterRepository.findById(pet.getAdopter().getId());
            if (adopter.isPresent()) {
                pet.setAdopter(adopter.get());
            }
        }
        return petRepository.save(pet);
    }
    
    public Pet updatePet(Long id, Pet petDetails) {
        Optional<Pet> optionalPet = petRepository.findById(id);
        if (optionalPet.isPresent()) {
            Pet pet = optionalPet.get();
            pet.setName(petDetails.getName());
            pet.setType(petDetails.getType());
            pet.setBreed(petDetails.getBreed());
            pet.setAdopted(petDetails.getAdopted());
            pet.setBreedable(petDetails.getBreedable());
            pet.setDiseases(petDetails.getDiseases());
            
            // Handle adopter assignment
            if (petDetails.getAdopted() && petDetails.getAdopter() != null && petDetails.getAdopter().getId() != null) {
                Optional<Adopter> adopter = adopterRepository.findById(petDetails.getAdopter().getId());
                if (adopter.isPresent()) {
                    pet.setAdopter(adopter.get());
                }
            } else if (!petDetails.getAdopted()) {
                pet.setAdopter(null);
            }
            
            return petRepository.save(pet);
        }
        return null;
    }
    
    public boolean deletePet(Long id) {
        Optional<Pet> optionalPet = petRepository.findById(id);
        if (optionalPet.isPresent()) {
            petRepository.delete(optionalPet.get());
            return true;
        }
        return false;
    }
    
    public List<Pet> getPetsByAdoptionStatus(Boolean adopted) {
        return petRepository.findByAdoptedWithAdopter(adopted);
    }
    
    public List<Pet> getPetsByType(String type) {
        return petRepository.findByType(type);
    }
    
    public List<Pet> searchPetsByName(String name) {
        return petRepository.findByNameContainingIgnoreCase(name);
    }
    
    public List<Pet> searchPetsByBreed(String breed) {
        return petRepository.findByBreedContainingIgnoreCase(breed);
    }
    
    public Pet adoptPet(Long petId, Long adopterId) {
        Optional<Pet> optionalPet = petRepository.findById(petId);
        Optional<Adopter> optionalAdopter = adopterRepository.findById(adopterId);
        
        if (optionalPet.isPresent() && optionalAdopter.isPresent()) {
            Pet pet = optionalPet.get();
            Adopter adopter = optionalAdopter.get();
            
            pet.setAdopted(true);
            pet.setAdopter(adopter);
            
            return petRepository.save(pet);
        }
        return null;
    }
    
    public Pet unadoptPet(Long petId) {
        Optional<Pet> optionalPet = petRepository.findById(petId);
        if (optionalPet.isPresent()) {
            Pet pet = optionalPet.get();
            pet.setAdopted(false);
            pet.setAdopter(null);
            return petRepository.save(pet);
        }
        return null;
    }
}
