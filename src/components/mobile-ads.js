import React from 'react';
import Responsive from 'react-responsive';

import Ads from '../components/ads';

export default function MobileAds (props) {
  return (
    <div>
      <Responsive maxWidth={991}>
        <Ads />
      </Responsive>
    </div>
  );
}
