const PetList = ({ pets, onEdit, onDelete, loading, error }) => {
  if (loading) return <div className="loading">Loading pets...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (pets.length === 0) return <div className="empty-state">No pets available. Add your first pet!</div>;

  return (
    <div className="pet-grid">
      {pets.map((pet) => (
        <div key={pet.id} className="pet-card">
          <div className="pet-header">
            <h3>{pet.name}</h3>
            <span className={`badge ${pet.adopted ? 'badge-adopted' : 'badge-available'}`}>
              {pet.adopted ? 'Adopted' : 'Available'}
            </span>
          </div>
          <div className="pet-details">
            <p><strong>Type:</strong> {pet.type}</p>
            <p><strong>Breed:</strong> {pet.breed}</p>
            <p><strong>Breedable:</strong> {pet.breedable ? 'Yes' : 'No'}</p>
            <p><strong>Diseases:</strong> {pet.diseases || 'None'}</p>
            {pet.adopted && pet.adopter && (
              <div className="adopter-info">
                <p><strong>Adopted by:</strong> {pet.adopter.name}</p>
                <p><strong>Contact:</strong> {pet.adopter.contact}</p>
              </div>
            )}
          </div>
          <div className="pet-actions">
            <button onClick={() => onEdit(pet)} className="btn btn-edit">Edit</button>
            <button onClick={() => onDelete(pet.id)} className="btn btn-delete">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PetList;
