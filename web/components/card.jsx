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
  },
});

const Card = (props) => {
  const styles = useStyles();
  const { image, text, slug } = props;

  const inner = (
    <div className={styles.card}>
      {/* TODO: max image card sizing */}
      {image ? <img src={image} width="70%" alt={image} /> : null}
      <h3>{text}</h3>
    </div>
  );
  return (slug ? (
    <Link href={`/post/${slug}`}>
      <a className={styles.container}>
        {inner}
      </a>
    </Link>
  )
    : inner
  );
};

Card.propTypes = {
  text: PropTypes.string.isRequired,
  image: PropTypes.string,
  slug: PropTypes.string,
};

Card.defaultProps = {
  image: null,
  slug: null,
};

export default Card;
