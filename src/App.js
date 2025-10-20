import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import PetList from './components/PetList';
import PetForm from './components/PetForm';
import AdopterForm from './components/AdopterForm';
import AdopterList from './components/AdopterList';
import api from './api/apiService';

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
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
        }

        .app {
          min-height: 100vh;
        }

        .navbar {
          background: white;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          padding: 1.5rem 0;
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          text-align: center;
        }

        .nav-logo {
          color: #667eea;
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .nav-subtitle {
          color: #666;
          font-size: 1rem;
        }

        .container {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 0 2rem;
        }

        .tabs {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .tab {
          padding: 0.75rem 2rem;
          background: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          color: #666;
          transition: all 0.3s ease;
        }

        .tab:hover {
          background: #f0f0f0;
        }

        .tab.active {
          background: #667eea;
          color: white;
        }

        .content {
          display: grid;
          gap: 2rem;
        }

        .section {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .section h2 {
          color: #333;
          margin-bottom: 1.5rem;
          font-size: 1.5rem;
        }

        .form-container h2 {
          color: #667eea;
        }

        .form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-weight: 600;
          color: #333;
          font-size: 0.9rem;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 0.75rem;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #667eea;
        }

        .checkbox-row {
          grid-template-columns: auto auto;
          justify-content: start;
          gap: 2rem;
        }

        .form-group-checkbox {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .form-group-checkbox input[type="checkbox"] {
          width: 20px;
          height: 20px;
          cursor: pointer;
        }

        .form-group-checkbox label {
          cursor: pointer;
          font-weight: 600;
          color: #333;
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }

        .btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-primary {
          background: #667eea;
          color: white;
        }

        .btn-primary:hover {
          background: #5568d3;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .btn-secondary {
          background: #f0f0f0;
          color: #333;
        }

        .btn-secondary:hover {
          background: #e0e0e0;
        }

        .btn-edit {
          background: #4CAF50;
          color: white;
        }

        .btn-edit:hover {
          background: #45a049;
        }

        .btn-delete {
          background: #f44336;
          color: white;
        }

        .btn-delete:hover {
          background: #da190b;
        }

        .btn-sm {
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        }

        .pet-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .pet-card {
          background: #f9f9f9;
          border-radius: 12px;
          padding: 1.5rem;
          border: 2px solid #e0e0e0;
          transition: all 0.3s ease;
        }

        .pet-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          border-color: #667eea;
        }

        .pet-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #e0e0e0;
        }

        .pet-header h3 {
          color: #333;
          font-size: 1.3rem;
        }

        .badge {
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .badge-adopted {
          background: #4CAF50;
          color: white;
        }

        .badge-available {
          background: #2196F3;
          color: white;
        }

        .pet-details {
          margin-bottom: 1rem;
        }

        .pet-details p {
          margin-bottom: 0.5rem;
          color: #666;
        }

        .adopter-info {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #e0e0e0;
          background: #fff;
          padding: 1rem;
          border-radius: 8px;
        }

        .pet-actions {
          display: flex;
          gap: 0.5rem;
        }

        .pet-actions .btn {
          flex: 1;
        }

        .table-container {
          overflow-x: auto;
        }

        .adopter-table {
          width: 100%;
          border-collapse: collapse;
        }

        .adopter-table th,
        .adopter-table td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid #e0e0e0;
        }

        .adopter-table th {
          background: #f5f5f5;
          font-weight: 600;
          color: #333;
        }

        .adopter-table tr:hover {
          background: #f9f9f9;
        }

        .loading,
        .error,
        .empty-state {
          text-align: center;
          padding: 3rem;
          color: #666;
          font-size: 1.1rem;
        }

        .error {
          color: #f44336;
        }

        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }

          .pet-grid {
            grid-template-columns: 1fr;
          }

          .tabs {
            flex-direction: column;
          }

          .container {
            padding: 0 1rem;
          }

          .section {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default App;