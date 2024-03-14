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

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={imageUrl} style={{ width: '18rem', height: '18rem' }} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>Price: {price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CardComponent;