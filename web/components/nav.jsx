import React from 'react';
import Link from 'next/link';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  nav: {
    textAlign: 'center',
  },
  list: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '4px 16px',
  },
  listItem: {
    display: 'flex',
    padding: '6px 8px',
  },
  link: {
    color: '#067df7',
    textDecoration: 'none',
    fontSize: '13px',
  },
});

const links = [
  { href: 'https://zeit.co/now', label: 'ZEIT' },
  { href: 'https://github.com/zeit/next.js', label: 'GitHub' },
].map((link) => ({ ...link, key: `nav-link-${link.href}-${link.label}` }));

const Nav = () => {
  const classes = useStyles();
  return (
    <nav className={classes.nav}>
      <ul className={classes.list}>
        <li className={classes.listItem}>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        {links.map(({ key, href, label }) => (
          <li key={key} className={classes.listItem}>
            <a href={href} className={classes.link}>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
