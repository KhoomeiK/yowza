import React from 'react';
import Link from 'next/link';
import { createUseStyles } from 'react-jss';
import { Colors, Styles } from '@src/utils/config';

const useStyles = createUseStyles({
  nav: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    boxShadow: '0 1px 0 hsla(0,3%,67%,.1), 0 2px 1px hsla(0,1%,71%,.1)',
    position: 'fixed',
    top: 0,
    zIndex: 100,
    width: '100%',
  },
  list: {
    maxWidth: Styles.maxWidth,
    margin: '0 auto',
    padding: '1rem',

    display: 'flex',
  },
  listItem: {
    display: 'flex',
    padding: '6px 8px',
  },
  link: {
    color: Colors.primary,
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '1rem',
  },
  logo: {
    // Allows .logo to extend all of the properties from .link
    extend: 'link',

    fontWeight: 'bold',
  },
});

const Nav = () => {
  const styles = useStyles();
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <Link href="/">
            <a className={styles.logo}>YOWZA!</a>
          </Link>
        </li>
        <li className={styles.listItem}>
          <Link href="/trending">
            <a className={styles.link}>Trending</a>
          </Link>
        </li>
        <li className={styles.listItem}>
          <Link href="/random">
            <a className={styles.link}>Random</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
