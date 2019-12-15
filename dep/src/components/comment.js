import React from 'react';
import ReactMarkdown from 'react-markdown';

const commentStyle = {
  marginBottom: '2em'
};

const titleStyle = {
  fontSize: '1.625rem',
  fontWeight: 500,
  marginBottom: '0.75rem'
};

const contentStyle = {
  marginTop: '0.75rem'
};

export default function Comment (props) {
  return (
    <div style={commentStyle}>
      <h2 style={titleStyle}>{props.index}. {props.title}</h2>
      <div style={contentStyle}>
        <ReactMarkdown
          source={props.content}
          skipHtml
          // Make it so code tags are not escaped into <pre><code> (because it somehow fucks up the styling)
          disallowedTypes={['code']}
          unwrapDisallowed
        />
      </div>
    </div>
  );
}
