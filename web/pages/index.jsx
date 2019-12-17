import React from 'react';
import { createUseStyles } from 'react-jss';

import Wrapper from '../components/wrapper';

const useStyles = createUseStyles({
  hero: {
    width: '100%',
    color: '#333',
  },
  title: {
    margin: 0,
    width: '100%',
    paddingTop: '80px',
    lineHeight: '1.15',
    fontSize: '48px',
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
  },
  row: {
    maxWidth: '880px',
    margin: '80px auto 40px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  card: {
    padding: '18px 18px 24px',
    width: '220px',
    textAlign: 'left',
    textDecoration: 'none',
    color: '#434343',
    border: '1px solid #9b9b9b',
    '&:hover': {
      borderColor: '#067df7',
    },
    '& h3': {
      margin: 0,
      color: '#067df7',
      fontSize: '18px',
    },
    '& p': {
      margin: 0,
      padding: '12px 0 0',
      fontSize: '13px',
      color: '#333',
    },
  },
});

const Home = () => {
  const classes = useStyles();
  return (
    <Wrapper>
      <div className={classes.hero}>
        <h1 className={classes.title}>Welcome to Next.js!</h1>
        <p className={classes.description}>
          To get started, edit
          <code>pages/index.js</code>
          and save to reload.
        </p>

        <div className={classes.row}>
          <a href="https://nextjs.org/docs" className={classes.card}>
            <h3>Documentation &rarr;</h3>
            <p>Learn more about Next.js in the documentation.</p>
          </a>
          <a href="https://nextjs.org/learn" className={classes.card}>
            <h3>Next.js Learn &rarr;</h3>
            <p>Learn about Next.js by following an interactive tutorial!</p>
          </a>
          <a
            href="https://github.com/zeit/next.js/tree/master/examples"
            className={classes.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Find other example boilerplates on the Next.js GitHub.</p>
          </a>
        </div>
      </div>
    </Wrapper>
  );
};

export default Home;
