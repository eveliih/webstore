import React from 'react';
import Card from 'react-bootstrap/Card';

import PropTypes from 'prop-types';

CardComponent.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

function CardComponent(props) {
  const { imageUrl, title, price } = props;

  const handleCardClick = () => {
    console.log('Card clicked');
  };

  return (
    <Card
      style={{ width: '18rem', transition: 'transform 0.3s', transform: 'scale(1)', boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)' }}
      onClick={handleCardClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.3)';
      }}
    >
      <Card.Img variant="top" src={imageUrl} style={{ width: '18rem', height: '18rem' }} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>Price: {price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CardComponent;