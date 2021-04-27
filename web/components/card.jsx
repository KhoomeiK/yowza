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
    padding: '1rem',
    margin: '1.5rem 0',

    borderRadius: '0.5rem',
    background: 'white',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  },
  image: {
    width: '100%',
    maxHeight: '50%',
    objectFit: 'cover',
    objectPosition: 'center center',
  },
  text: {
    margin: '0.5rem',
  },
  title: {
    fontWeight: '500',
    fontSize: '1.5rem',
  },
});

const Card = (props) => {
  const styles = useStyles();
  const {
    image, title, description, slug,
  } = props;

  const inner = (
    <div className={styles.card}>
      {/* TODO: max image card sizing */}
      {image && image !== '/NULL/' ? <img className={styles.image} src={image} alt="" /> : null}
      <p className={styles.text}>
        <span className={styles.title}>{title}</span>
        {' '}
        {description ? <br /> : null}
        {description}
      </p>
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
  title: (props, propName, componentName) => {
    if (!props.title && !props.description) {
      return new Error(`One of props 'title' or 'description' was not specified in '${componentName}'.`);
    }
    return undefined;
  },
  description: (props, propName, componentName) => {
    if (!props.title && !props.description) {
      return new Error(`One of props 'title' or 'description' was not specified in '${componentName}'.`);
    }
    return undefined;
  },
  image: PropTypes.string,
  slug: PropTypes.string,
};

Card.defaultProps = {
  title: undefined,
  description: undefined,
  image: undefined,
  slug: undefined,
};

export default Card;
