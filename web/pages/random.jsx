import React from 'react';
import PropTypes from 'prop-types';
import unfetch from 'isomorphic-unfetch';
import Router from 'next/router';

import Error from '@src/components/error';


const Random = (props) => {
  const { error } = props;
  if (error) {
    return (
      <Error message={error.message} status={error.status} />
    );
  }
  return null;
};

Random.getInitialProps = async ({ res }) => {
  const apiReq = await unfetch('http://localhost:5000/random');
  if (apiReq.ok === false) {
    res.statusCode = apiReq.status;
    return { error: { status: apiReq.status, message: apiReq.statusText } };
  }
  const postData = await apiReq.json();

  if (res) {
    res.writeHead(302, {
      Location: `/post/${postData.slug}`,
    });
    res.end();
  } else {
    Router.push(`/post/${postData.slug}`);
  }
  return {};
};

Random.propTypes = {
  error: PropTypes.shape({ status: PropTypes.number, message: PropTypes.string.isRequired }),
};

Random.defaultProps = {
  error: undefined,
};

export default Random;
