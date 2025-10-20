const AdopterList = ({ adopters, onDelete, loading }) => {
  if (loading) return <div className="loading">Loading adopters...</div>;
  if (adopters.length === 0) return <div className="empty-state">No adopters registered yet.</div>;

  return (
    <div className="adopter-list">
      <h2>Registered Adopters</h2>
      <div className="table-container">
        <table className="adopter-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {adopters.map((adopter) => (
              <tr key={adopter.id}>
                <td>{adopter.name}</td>
                <td>{adopter.contact}</td>
                <td>{adopter.address}</td>
                <td>
                  <button
                    onClick={() => onDelete(adopter.id)}
                    className="btn btn-delete btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdopterList;
