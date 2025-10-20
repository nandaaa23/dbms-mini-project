import { useState } from 'react';

const AdopterForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ name: '', contact: '', address: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', contact: '', address: '' });
  };

 return (
    <div className="form-container">
      <h2>Add Adopter</h2>
      <div className="form">
        <div className="form-group">
          <label>Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Full name"
          />
        </div>
        <div className="form-group">
          <label>Contact *</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
            placeholder="Phone or email"
          />
        </div>
        <div className="form-group">
          <label>Address *</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            placeholder="Full address"
            rows="3"
          />
        </div>
        <button type="button" onClick={handleSubmit} className="btn btn-primary">Add Adopter</button>
      </div>
    </div>
  );
};

export default AdopterForm;
