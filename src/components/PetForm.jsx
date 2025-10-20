import { useState, useEffect } from 'react';

const PetForm = ({ editingPet, onSubmit, onCancel, adopters }) => {
  const [formData, setFormData] = useState({
    name: '', type: '', breed: '', adopted: false,
    breedable: false, diseases: '', adopterId: '',
  });

  useEffect(() => {
    if (editingPet) {
      setFormData({
        name: editingPet.name || '',
        type: editingPet.type || '',
        breed: editingPet.breed || '',
        adopted: editingPet.adopted || false,
        breedable: editingPet.breedable || false,
        diseases: editingPet.diseases || '',
        adopterId: editingPet.adopterId || '',
      });
    }
  }, [editingPet]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleReset = () => {
    setFormData({
      name: '', type: '', breed: '', adopted: false,
      breedable: false, diseases: '', adopterId: '',
    });
    if (onCancel) onCancel();
  };

  return (
    <div className="form-container">
      <h2>{editingPet ? 'Update Pet' : 'Add New Pet'}</h2>
      <div className="form">
        <div className="form-row">
          <div className="form-group">
            <label>Pet Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g., Max"
            />
          </div>
          <div className="form-group">
            <label>Type *</label>
            <select name="type" value={formData.type} onChange={handleChange} required>
              <option value="">Select type</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="bird">Bird</option>
              <option value="rabbit">Rabbit</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Breed *</label>
            <input
              type="text"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              required
              placeholder="e.g., Golden Retriever"
            />
          </div>
          <div className="form-group">
            <label>Diseases</label>
            <input
              type="text"
              name="diseases"
              value={formData.diseases}
              onChange={handleChange}
              placeholder="e.g., None or specific condition"
            />
          </div>
        </div>

        <div className="form-row checkbox-row">
          <div className="form-group-checkbox">
            <input
              type="checkbox"
              id="adopted"
              name="adopted"
              checked={formData.adopted}
              onChange={handleChange}
            />
            <label htmlFor="adopted">Adopted</label>
          </div>
          <div className="form-group-checkbox">
            <input
              type="checkbox"
              id="breedable"
              name="breedable"
              checked={formData.breedable}
              onChange={handleChange}
            />
            <label htmlFor="breedable">Breedable</label>
          </div>
        </div>

        {formData.adopted && (
          <div className="form-group">
            <label>Select Adopter</label>
            <select name="adopterId" value={formData.adopterId} onChange={handleChange}>
              <option value="">Select adopter</option>
              {adopters.map((adopter) => (
                <option key={adopter.id} value={adopter.id}>
                  {adopter.name} - {adopter.contact}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="form-actions">
          <button type="button" onClick={handleSubmit} className="btn btn-primary">
            {editingPet ? 'Update Pet' : 'Add Pet'}
          </button>
          <button type="button" onClick={handleReset} className="btn btn-secondary">
            {editingPet ? 'Cancel' : 'Reset'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetForm;
