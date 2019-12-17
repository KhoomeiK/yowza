import React from 'react';
import PropTypes from 'prop-types';
import stringHash from 'string-hash';
import { createUseStyles } from 'react-jss';

import { Styles } from '@src/utils/config';
import Ad from '@src/components/ad';
import Wrapper from '@src/components/wrapper';

const useStyles = createUseStyles({
  container: {
    maxWidth: Styles.maxWidth,
    margin: '0 auto',
  },
  content: {
    // DEBUG background: 'pink',
    padding: '1rem',
  },
  side: {
    // DEBUG background: 'lightblue',
    padding: '1rem',
  },
  '@media (min-width: 769px)': {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
    },
    content: {
      flex: 5,
    },
    side: {
      flex: 2,
    },
  },
});


/**
 * @typedef PostData
 * @property {string} title The post's title
 * @property {string[]} comments The post's comments
 */

/**
 * Post Page
 * @param {PostData} props
 */
const Post = (props) => {
  const styles = useStyles();
  const { title, comments } = props;

  return (
    <Wrapper title={title}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>{title}</h1>
          {
            comments.map((comment) => (
              <div key={stringHash(comment)}>
                <p>{comment}</p>
              </div>
            ))
          }
        </div>
        <div className={styles.side}>
          <p>SIDE MENU HERE</p>
          <Ad />
        </div>
      </div>
    </Wrapper>
  );
};

Post.getInitialProps = async () => ({
  // TODO: Fetch data from server based on request URL (using isomorphic-unfetch)
  title: 'Some Random Post',
  comments: [
    'Some Random Comment',
    'Lorem Ipsum Dolore Sit Amet',
  ],
});

Post.propTypes = {
  title: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Post;
