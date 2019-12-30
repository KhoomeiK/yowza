import React from 'react';
import PropTypes from 'prop-types';
import unfetch from 'isomorphic-unfetch';
import { createUseStyles } from 'react-jss';

import Ad from '@src/components/ad';
import Card from '@src/components/card';
import Error from '@src/components/error';
import Wrapper from '@src/components/wrapper';
import { Styles } from '@src/utils/config';
import { getOriginUrl } from '@src/utils/url';

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

const Home = (props) => {
  const styles = useStyles();
  const { articles, error } = props;
  console.log(articles);

  if (articles === undefined || error) {
    return (<Error message={error.message || ''} status={error.status || 500} />);
  }

  return (
    <Wrapper>
      <div className={styles.container}>
        <div className={styles.content}>
          {articles.map((article) => (
            <Card
              image={article.image}
              title={article.post}
              slug={article.slug}
              key={article.slug}
            />
          ))}
        </div>
        <div className={styles.side}>
          <Ad />
        </div>
      </div>
    </Wrapper>
  );
};

Home.getInitialProps = async ({ res, req }) => {
  try {
    const apiReq = await unfetch(`${getOriginUrl(req)}/api/home`);
    if (apiReq.ok === false) {
      res.statusCode = apiReq.status;
      return { error: { status: apiReq.status, message: apiReq.statusText } };
    }
    const postData = await apiReq.json();
    return { articles: postData };
  } catch (err) {
    if (res) res.statusCode = 500;
    if (err.code === 'ECONNREFUSED') {
      return { error: { status: 500, message: 'Failed to connect to server. Please try again later.' } };
    }

    return { error: { status: 500, message: err.message } };
  }
};

Home.propTypes = {
  error: PropTypes.shape({ status: PropTypes.number, message: PropTypes.string.isRequired }),
  articles: PropTypes.arrayOf(PropTypes.shape({
    views: PropTypes.number,
    post: PropTypes.string,
    slug: PropTypes.string,
    image: PropTypes.string,
  })),
};

Home.defaultProps = {
  error: undefined,
  articles: undefined,
};

export default Home;
