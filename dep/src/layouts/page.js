import React from 'react';
import Responsive from 'react-responsive';

import Navbar from '../components/navbar';
import Ads from '../components/ads';

const containerStyle = {
  // Add top spacing
  paddingTop: '3em',

  // Flexbox for content + sidebar
  display: 'flex',

  // Center Align
  justifyContent: 'center',
  maxWidth: '75em',
  margin: '0 auto'
};

const contentStyle = {
  padding: '0.5em 1em',
  flex: '3'
};

const sideStyle = {
  padding: '0.5em 1em',
  flex: '1'
};

export default function PageLayout ({ children }) {
  return (
    <div>
      <Navbar />
      <div style={containerStyle}>
        <div style={contentStyle}>
          { children }
        </div>
        { /* Show ads on sidebar desktop */ }
        <Responsive minWidth={992}>
          <div style={sideStyle}>
            <Ads />
          </div>
        </Responsive>
      </div>
    </div>
  );
}
