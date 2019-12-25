import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

const styles = createUseStyles({
  card: {
    border: '1px solid black',
    padding: '1rem',
    margin: '1rem',
    textAlign: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

const Card = (props) => {
  const { image, text, slug } = props;
  return (
    <div role="button" tabIndex={0} className={styles().card} onKeyDown onClick={() => { window.location = `http://localhost:3000/a/${slug}`; }}>
      <img src={image} width="70%" alt={image} />
      <h3>{text}</h3>
    </div>
  );
};

Card.propTypes = {
  image: PropTypes.string,
  text: PropTypes.string,
  slug: PropTypes.string,
};

Card.defaultProps = {
  image: null,
  text: null,
  slug: null,
};

export default Card;
