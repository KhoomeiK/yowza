import React from 'react';
import { split } from 'sentence-splitter';

import Comment from './comment';

const postStyle = {
  marginBottom: '2.5em',
  borderBottom: '2px solid #e1e4e8'
};

const titleStyle = {
  fontSize: '2.5rem',
  marginBottom: '0.5em',
  lineHeight: 1.25,
  fontWeight: 600
};

export default function Post (props) {
  return (
    <div style={postStyle}>
      <h1 style={titleStyle}>
        {props.title}
      </h1>
      <div>
        {
          props.content.map(processComment).map((value, index) =>
            <Comment
              key={value[0].replace(' ', '-').trim()}
              index={index + 1}
              title={value[0]}
              content={value[1]}
            />
          )
        }
      </div>
    </div>
  );
}

function processComment (content) {
  const splitContent = split(content)[0];
  // Get first sentence and make sure first letter is uppercase
  const commentTitle = (splitContent.raw.charAt(0).toUpperCase() + splitContent.raw.slice(1));
  const commentContent = content.substring(splitContent.range[1]);
  return [commentTitle, commentContent];
}
