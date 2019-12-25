import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import axios from 'axios';

import Wrapper from '@src/components/wrapper';
import Card from '@src/components/card';
import { Styles } from '@src/utils/config';

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

// const Home = async () => {
//   const styles = useStyles();
//   return (
// <Wrapper>
//   <div className={styles.container}>
//     <div className={styles.content}>
//       <Card
//         image="https://upload.wikimedia.org/wikipedia/commons/f/f6/GoodMorningToAll_1893_song.jpg"
//         text="What is a song which seems to be upbeat and happy until you listen to the lyrics?"
//       />
//     </div>
//     <div className={styles.side}>
//       <p>Ads</p>
//     </div>
//   </div>
// </Wrapper>
//   );
// };

const Home = () => {
  const styles = useStyles();
  const [state, setState] = useState(null);
  useEffect(() => {
    async function getToken() {
      const data = await axios('http://localhost:5000');
      console.log(data);
      setState(data.data);
    }
    getToken();
  }, []);
  // const data = await axios('http://localhost:5000');
  // console.log(data);
  return (
    <Wrapper>
      <div className={styles.container}>
        <div className={styles.content}>
          {state
            ? state.map((article) => (
              <Card
                image={article.image}
                text={article.post}
                slug={article.slug}
                key={article.slug}
              />
            ))
            : <p>Loading Articles</p>}
        </div>
        <div className={styles.side}>
          <p>Ads</p>
        </div>
      </div>
    </Wrapper>
  );
};

export default Home;
