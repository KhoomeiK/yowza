import React, { useState } from 'react';
import PropTypes from 'prop-types';
import unfetch from 'isomorphic-unfetch';
import { createUseStyles } from 'react-jss';
import InfiniteScroll from 'react-infinite-scroller';

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
  const { error } = props;
  const [articles, setArticles] = useState(props.articles);

  if (articles === undefined || error) {
    return (<Error message={error.message || ''} status={error.status || 500} />);
  }

  return (
    <Wrapper>
      <div className={styles.container}>
        <div className={styles.content}>
          <InfiniteScroll
            pageStart={0}
            loadMore={() => loadMore(articles, setArticles)}
            hasMore
            loader={<div className="loader" key={0}>Loading ...</div>}
          >
            {articles.map((article) => (
              <Card
                image={article.image}
                title={article.post}
                slug={article.slug}
                key={article.slug}
              />
            ))}
          </InfiniteScroll>
          {/* <button type="button" onClick={() => window.location.reload()}>Load more</button> */}
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
    const options = req && req.loadedArticles ? {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ loadedArticles: req.loadedArticles }),
    } : {};
    const apiReq = await unfetch(`${getOriginUrl(req)}/api/home`, options);
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

const loadMore = async (articles, setArticles) => {
  const loadedArticles = articles.map((article) => article.slug);
  const newArticles = await Home.getInitialProps({ res: 1, req: { loadedArticles } });
  setArticles([...articles, ...(newArticles.articles)]);
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
