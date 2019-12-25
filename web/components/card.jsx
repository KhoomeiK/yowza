import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    textDecoration: 'inherit',
    color: 'inherit',
  },
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
  const styles = useStyles();
  const { image, text, slug } = props;
  return (
    <Link href={`/post/${slug}`}>
      <a className={styles.container}>
        <div className={styles.card}>
          <img src={image} width="70%" alt={image} />
          <h3>{text}</h3>
        </div>
      </a>
    </Link>
  );
};

Card.propTypes = {
  image: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default Card;
