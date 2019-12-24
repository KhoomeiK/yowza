import React from 'react';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';

const useStyles = createUseStyles({
  container: {
    // DEBUG background: 'purple',
  },
});

const Card = (props) => {
  const styles = useStyles();
  const { image, text } = props;
  return (
    <div className={styles.container}>
      <img src={image} height={200} alt={image} />
      <p>{text}</p>
    </div>
  );
};

Card.propTypes = {
  image: PropTypes.string,
  text: PropTypes.string,
};

Card.defaultProps = {
  image: null,
  text: null,
};

export default Card;
