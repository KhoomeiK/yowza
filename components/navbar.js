import Link from 'next/link';

const navStyle = {
  borderBottom: '1px solid #e1e4e8',
  padding: '1em'
};

const titleStyle = {
  display: 'inline-block',
  margin: 0,
  color: 'red',
  cursor: 'pointer'
};

export default () => (
  <nav style={navStyle}>
    <Link href='/'>
      <h1 style={titleStyle}>Yowza!</h1>
    </Link>
  </nav>
);
