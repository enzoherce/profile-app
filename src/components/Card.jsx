function Card({ title, description, children }) {
    return (
      <div className="profile-card">
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="card-content">{children}</div>
      </div>
    );
  }
  
  export default Card;
  