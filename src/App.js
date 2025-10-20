import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import PetList from './components/PetList';
import PetForm from './components/PetForm';
import AdopterForm from './components/AdopterForm';
import AdopterList from './components/AdopterList';
import api from './api/apiService';
import './App.css';

const App = () => {
  const [pets, setPets] = useState([]);
  const [adopters, setAdopters] = useState([]);
  const [editingPet, setEditingPet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('pets');

  useEffect(() => {
    // Dummy pets data
    setPets([
      {
        id: 1,
        name: 'Max',
        type: 'dog',
        breed: 'Golden Retriever',
        adopted: false,
        breedable: true,
        diseases: 'None',
      },
      {
        id: 2,
        name: 'Bella',
        type: 'cat',
        breed: 'Persian',
        adopted: true,
        breedable: false,
        diseases: 'Minor allergy',
        adopterId: 1,
        adopter: { name: 'John Doe', contact: '123-456-7890' },
      },
      {
        id: 3,
        name: 'Charlie',
        type: 'dog',
        breed: 'Labrador',
        adopted: false,
        breedable: true,
        diseases: 'None',
      },
      {
        id: 4,
        name: 'Luna',
        type: 'cat',
        breed: 'Siamese',
        adopted: false,
        breedable: false,
        diseases: 'None',
      },
      {
        id: 5,
        name: 'Rocky',
        type: 'dog',
        breed: 'German Shepherd',
        adopted: true,
        breedable: true,
        diseases: 'Hip dysplasia',
        adopterId: 2,
        adopter: { name: 'Jane Smith', contact: '098-765-4321' },
      },
      {
        id: 6,
        name: 'Whiskers',
        type: 'cat',
        breed: 'Maine Coon',
        adopted: false,
        breedable: true,
        diseases: 'None',
      },
      {
        id: 7,
        name: 'Buddy',
        type: 'dog',
        breed: 'Beagle',
        adopted: false,
        breedable: false,
        diseases: 'Ear infection (treated)',
      },
      {
        id: 8,
        name: 'Tweety',
        type: 'bird',
        breed: 'Canary',
        adopted: false,
        breedable: true,
        diseases: 'None',
      },
    ]);

    // Dummy adopters data
    setAdopters([
      { id: 1, name: 'John Doe', contact: '123-456-7890', address: '123 Main St, New York, NY' },
      { id: 2, name: 'Jane Smith', contact: '098-765-4321', address: '456 Oak Ave, Los Angeles, CA' },
      { id: 3, name: 'Mike Johnson', contact: '555-123-4567', address: '789 Pine Rd, Chicago, IL' },
      { id: 4, name: 'Sarah Williams', contact: '555-987-6543', address: '321 Maple Dr, Houston, TX' },
    ]);
    
    setLoading(false);
  }, []);

  // Add or update pet
  const handlePetSubmit = (petData) => {
    if (editingPet) {
      const updatedPet = { ...editingPet, ...petData };

      if (petData.adopted && petData.adopterId) {
        const adopter = adopters.find(a => a.id === parseInt(petData.adopterId));
        if (adopter) {
          updatedPet.adopter = adopter;
        }
      } else {
        updatedPet.adopter = null;
      }

      setPets(pets.map((p) => (p.id === editingPet.id ? updatedPet : p)));
      setEditingPet(null);
    } else {
      const newPet = { ...petData, id: Date.now() };

      if (petData.adopted && petData.adopterId) {
        const adopter = adopters.find(a => a.id === parseInt(petData.adopterId));
        if (adopter) {
          newPet.adopter = adopter;
        }
      }

      setPets([...pets, newPet]);
    }
  };

  // Delete pet
  const handlePetDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this pet?')) return;
    setPets(pets.filter((p) => p.id !== id));
  };

  // Add adopter
  const handleAdopterSubmit = (adopterData) => {
    const newAdopter = { ...adopterData, id: Date.now() };
    setAdopters([...adopters, newAdopter]);
  };

  // Delete adopter
  const handleAdopterDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this adopter?')) return;

    const hasPets = pets.some(p => p.adopterId === id);
    if (hasPets) {
      alert('Cannot delete adopter. Please reassign their pets first.');
      return;
    }

    setAdopters(adopters.filter((a) => a.id !== id));
  };

  return (
    <div className="app">
      <Navbar />
      
      <div className="container">
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'pets' ? 'active' : ''}`}
            onClick={() => setActiveTab('pets')}
          >
            Pets
          </button>
          <button
            className={`tab ${activeTab === 'adopters' ? 'active' : ''}`}
            onClick={() => setActiveTab('adopters')}
          >
            Adopters
          </button>
        </div>

        {activeTab === 'pets' && (
          <div className="content">
            <div className="section">
              <PetForm
                editingPet={editingPet}
                onSubmit={handlePetSubmit}
                onCancel={() => setEditingPet(null)}
                adopters={adopters}
              />
            </div>
            <div className="section">
              <h2>All Pets</h2>
              <PetList
                pets={pets}
                onEdit={setEditingPet}
                onDelete={handlePetDelete}
                loading={loading}
                error={error}
              />
            </div>
          </div>
        )}

        {activeTab === 'adopters' && (
          <div className="content">
            <div className="section">
              <AdopterForm onSubmit={handleAdopterSubmit} />
            </div>
            <div className="section">
              <AdopterList
                adopters={adopters}
                onDelete={handleAdopterDelete}
                loading={loading}
              />
            </div>
          </div>
        )}
      </div>

      <style>{`
        
      `}</style>
    </div>
  );
};

export default App;