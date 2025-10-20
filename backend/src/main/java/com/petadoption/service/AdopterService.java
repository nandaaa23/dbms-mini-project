package com.petadoption.service;

import com.petadoption.entity.Adopter;
import com.petadoption.repository.AdopterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AdopterService {
    
    @Autowired
    private AdopterRepository adopterRepository;
    
    public List<Adopter> getAllAdopters() {
        return adopterRepository.findAllWithPets();
    }
    
    public Optional<Adopter> getAdopterById(Long id) {
        return adopterRepository.findById(id);
    }
    
    public Adopter createAdopter(Adopter adopter) {
        return adopterRepository.save(adopter);
    }
    
    public Adopter updateAdopter(Long id, Adopter adopterDetails) {
        Optional<Adopter> optionalAdopter = adopterRepository.findById(id);
        if (optionalAdopter.isPresent()) {
            Adopter adopter = optionalAdopter.get();
            adopter.setName(adopterDetails.getName());
            adopter.setContact(adopterDetails.getContact());
            adopter.setAddress(adopterDetails.getAddress());
            return adopterRepository.save(adopter);
        }
        return null;
    }
    
    public boolean deleteAdopter(Long id) {
        Optional<Adopter> optionalAdopter = adopterRepository.findById(id);
        if (optionalAdopter.isPresent()) {
            Adopter adopter = optionalAdopter.get();
            // Check if adopter has pets
            if (!adopter.getPets().isEmpty()) {
                return false; // Cannot delete adopter with pets
            }
            adopterRepository.delete(adopter);
            return true;
        }
        return false;
    }
    
    public List<Adopter> searchAdoptersByName(String name) {
        return adopterRepository.findByNameContainingIgnoreCase(name);
    }
    
    public List<Adopter> searchAdoptersByContact(String contact) {
        return adopterRepository.findByContactContaining(contact);
    }
}
