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
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [petsResponse, adoptersResponse] = await Promise.all([
        api.get('/pets'),
        api.get('/adopters')
      ]);
      setPets(petsResponse);
      setAdopters(adoptersResponse);
    } catch (err) {
      setError('Failed to load data. Please make sure the backend is running.');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add or update pet
  const handlePetSubmit = async (petData) => {
    try {
      setLoading(true);
      setError(null);
      
      let response;
      if (editingPet) {
        // Update existing pet
        const petToUpdate = { ...petData };
        if (petData.adopted && petData.adopterId) {
          petToUpdate.adopter = { id: parseInt(petData.adopterId) };
        }
        response = await api.put(`/pets/${editingPet.id}`, petToUpdate);
        setPets(pets.map((p) => (p.id === editingPet.id ? response : p)));
        setEditingPet(null);
      } else {
        // Create new pet
        const newPet = { ...petData };
        if (petData.adopted && petData.adopterId) {
          newPet.adopter = { id: parseInt(petData.adopterId) };
        }
        response = await api.post('/pets', newPet);
        setPets([...pets, response]);
      }
    } catch (err) {
      setError('Failed to save pet. Please try again.');
      console.error('Error saving pet:', err);
    } finally {
      setLoading(false);
    }
  };

  // Delete pet
  const handlePetDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this pet?')) return;
    
    try {
      setLoading(true);
      setError(null);
      await api.delete(`/pets/${id}`);
      setPets(pets.filter((p) => p.id !== id));
    } catch (err) {
      setError('Failed to delete pet. Please try again.');
      console.error('Error deleting pet:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add adopter
  const handleAdopterSubmit = async (adopterData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post('/adopters', adopterData);
      setAdopters([...adopters, response]);
    } catch (err) {
      setError('Failed to save adopter. Please try again.');
      console.error('Error saving adopter:', err);
    } finally {
      setLoading(false);
    }
  };

  // Delete adopter
  const handleAdopterDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this adopter?')) return;

    try {
      setLoading(true);
      setError(null);
      const response = await api.delete(`/adopters/${id}`);
      if (response.includes('successfully')) {
        setAdopters(adopters.filter((a) => a.id !== id));
      } else {
        setError('Cannot delete adopter. Please reassign their pets first.');
      }
    } catch (err) {
      setError('Cannot delete adopter. Please reassign their pets first.');
      console.error('Error deleting adopter:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Navbar />
      
      <div className="container">
        {error && (
          <div className="error-message" style={{ 
            background: '#ffebee', 
            color: '#c62828', 
            padding: '10px', 
            margin: '10px 0', 
            borderRadius: '4px',
            border: '1px solid #ffcdd2'
          }}>
            {error}
            <button 
              onClick={() => setError(null)} 
              style={{ 
                float: 'right', 
                background: 'none', 
                border: 'none', 
                color: '#c62828', 
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              ×
            </button>
          </div>
        )}
        
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
    </div>
  );
};

export default App;