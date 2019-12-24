import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { createUseStyles } from 'react-jss';

import { Name } from '@src/utils/config';
import Nav from './nav';


const useStyles = createUseStyles({
  main: {
    marginTop: '4rem',
  },
});

const Wrapper = (props) => {
  const { title, children } = props;
  const styles = useStyles();
  return (
    <div>
      <Head>
        <title>
          {
            // Display either "Name" or "Name - Title"
            `${Name} ${
              title !== undefined
                ? `- ${title}`
                : ''
            }`
          }
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <main className={styles.main}>
        { children }
      </main>
    </div>
  );
};

Wrapper.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

Wrapper.defaultProps = {
  title: undefined,
};

export default Wrapper;
