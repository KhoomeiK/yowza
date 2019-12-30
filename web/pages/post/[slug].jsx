import React from 'react';
import PropTypes from 'prop-types';
import stringHash from 'string-hash';
import { createUseStyles } from 'react-jss';
import unfetch from 'isomorphic-unfetch';
import { split } from 'sentence-splitter';

import { Styles } from '@src/utils/config';
import Ad from '@src/components/ad';
import Wrapper from '@src/components/wrapper';
import Error from '@src/components/error';
import Card from '@src/components/card';
import dayjs from 'dayjs';
import { getOriginUrl } from '@src/utils/url';

/*
 TODO: Make Error page actually good
 TODO: Stylize post page
 TODO: Make Random & Trending Buttons work
 TODO: Make Home page
 TODO: Migrate express server to nextjs (see: https://reacttricks.com/exploring-next-9-dynamic-routing-and-api-routes/)
*/

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
  image: {
    width: '100%',
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
  const {
    error, title, comments, image, date,
  } = props;

  if (error !== undefined) {
    return (<Error message={error.message} status={error.status} />);
  }

  return (
    <Wrapper title={title}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div>
            {image ? <img className={styles.image} src={image} alt="" /> : ''}
            <h1>{title}</h1>
            <span>
              Published on
              {' '}
              {date}
            </span>
          </div>
          {
            comments.map((comment) => {
              const firstSentence = split(comment.text)[0].raw;
              const otherSentences = comment.text.replace(firstSentence, '');
              return (
                <Card
                  title={firstSentence}
                  description={otherSentences}
                  image={comment.image}
                  key={stringHash(firstSentence)}
                />
              );
            })
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

Post.getInitialProps = async ({ res, query, req }) => {
  try {
    const apiReq = await unfetch(`${getOriginUrl(req)}/api/a/${query.slug}`);
    if (apiReq.ok === false) {
      res.statusCode = apiReq.status;
      return { error: { status: apiReq.status, message: apiReq.statusText } };
    }

    const postData = await apiReq.json();

    return ({
      title: postData.post,
      comments: postData.comments,
      image: postData.image,
      date: dayjs(postData.date).format('MMM. D, YYYY'),
    });
  } catch (err) {
    if (res) res.statusCode = 500;
    if (err.code === 'ECONNREFUSED') {
      return { error: { status: 500, message: 'Failed to connect to server. Please try again later.' } };
    }

    return { error: { status: 500, message: err.message } };
  }
};

Post.propTypes = {
  error: PropTypes.shape({ status: PropTypes.number, message: PropTypes.string.isRequired }),
  title: PropTypes.string,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      image: PropTypes.string,
    }),
  ),
  image: PropTypes.string,
  date: PropTypes.string,
};

Post.defaultProps = {
  error: undefined,
  title: '',
  comments: [],
  image: undefined,
  date: undefined,
};

export default Post;
