import React from 'react';

const navStyle = {
  borderBottom: '1px solid #e1e4e8',
  padding: '1em',
  position: 'fixed',
  top: '0',
  width: '100%',
  backgroundColor: 'white'
};

const containerStyle = {
  maxWidth: '75em',
  margin: '0 auto'
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
      <div style={containerStyle}>
        <a href='/'>
          <h1 style={titleStyle}>Yowza!</h1>
        </a>
      </div>
    </nav>
  );
}
