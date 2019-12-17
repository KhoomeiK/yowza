import React from 'react';
import PropTypes from 'prop-types';
import stringHash from 'string-hash';

import Wrapper from '../components/wrapper';


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
  const { title, comments } = props;

  return (
    <Wrapper title={title}>
      <h1>{title}</h1>
      {
        comments.map((comment) => (
          <div key={stringHash(comment)}>
            <p>{comment}</p>
          </div>
        ))
      }
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
