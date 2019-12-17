import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    // DEBUG background: 'purple',
  },
});

const Ad = () => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <p>AD HERE</p>
    </div>
  );
};

export default Ad;
