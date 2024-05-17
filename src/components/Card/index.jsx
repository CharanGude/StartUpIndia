import React from 'react';
import './index.css';

const Card = props => {
  const { logo, name, tagline, category, description} = props.details;
  const {handleCardClick} = props;

  const onSelect = () => {
    handleCardClick(props.details);
  }
  
    return (
        <div className="card" onClick={onSelect}>
            <img src={logo} alt="Company Logo" className="company-logo" />
            <div className="company-name">{name}</div>
            <div className="tagline">{tagline}</div>
            <div className="category"><strong>Category:</strong> {category}</div>
            <div className="description"><strong>Description:</strong> {description}</div>
        </div>
    );
}

export default Card;