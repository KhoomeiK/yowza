import React from 'react';
import PropTypes from 'prop-types';
import unfetch from 'isomorphic-unfetch';
import Router from 'next/router';

import Error from '@src/components/error';
import { getOriginUrl } from '@src/utils/url';


const Random = (props) => {
  const { error } = props;
  if (error) {
    return (
      <Error message={error.message} status={error.status} />
    );
  }
  return null;
};

Random.getInitialProps = async ({ res, req }) => {
  const baseUrl = getOriginUrl(req);
  const apiReq = await unfetch(`${baseUrl}/api/random`);
  if (apiReq.ok === false) {
    if (res) res.statusCode = apiReq.status;
    return { error: { status: apiReq.status, message: apiReq.statusText } };
  }
  // console.log(apiReq.body);
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
