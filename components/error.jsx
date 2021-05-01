import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import Link from 'next/link';

import Wrapper from '@src/components/wrapper';

const useStyles = createUseStyles({
  container: {
    padding: '1rem',
    margin: '0 auto',
    maxWidth: '50rem',
    textAlign: 'center',
  },
  status: {
    fontSize: '2rem',
    margin: '0.25rem',
  },
  message: {
    margin: 0,
    marginTop: '1rem',
  },
});

/**
 * Converts the given error code to an error title.
 * @param {number} errorCode The error code to get a title for.
 * @returns {string}
 */
function statusCodeToName(errorCode) {
  switch (errorCode) {
    case 500: return 'Internal Server Error';
    case 404: return 'Not Found';
    default: return undefined;
  }
}

const Error = (props) => {
  const styles = useStyles();
  const { message, status } = props;
  const statusType = statusCodeToName(status);
  return (
    <Wrapper>
      <div className={styles.container}>
        { status
          ? (
            <h3 className={styles.status}>
              {status}
              { statusType
                ? ` ${statusType}`
                : ''}
            </h3>
          )
          : ''}
        <p className={styles.message}>{message}</p>
        <p>
          You can try
          {' '}
          <Link href="/">
            <a>going home</a>
          </Link>
          .
        </p>
      </div>
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
