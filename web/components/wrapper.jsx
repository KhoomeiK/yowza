import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Name } from '@/utils/config';

import Nav from './nav';

const Wrapper = (props) => {
  const { title, children } = props;
  return (
    <div>
      <Head>
        <title>
          {`${Name} - ${title}`}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <main>
        { children }
      </main>
    </div>
  );
};

Wrapper.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default Wrapper;
