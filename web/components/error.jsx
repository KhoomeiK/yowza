import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from '@src/components/wrapper';

const Error = (props) => {
  const { message, status } = props;
  return (
    <Wrapper>
      { status ? <h3>{status}</h3> : '' }
      <p>{message}</p>
    </Wrapper>
  );
};

Error.propTypes = {
  message: PropTypes.string.isRequired,
  status: PropTypes.number,
};

Error.defaultProps = {
  status: undefined,
};

export default Error;
