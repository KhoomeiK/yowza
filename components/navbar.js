import Link from 'next/link';

const navStyle = {
  borderBottom: '1px solid #e1e4e8',
  padding: '1em',
  position: 'fixed',
  top: '0',
  width: '100%',
  backgroundColor: 'white'
};

const titleStyle = {
  display: 'inline-block',
  margin: 0,
  color: 'red',
  cursor: 'pointer'
};

export default function Navbar () {
  return (
    <nav style={navStyle}>
      <Link href='/'>
        <h1 style={titleStyle}>Yowza!</h1>
      </Link>
    </nav>
  );
}
