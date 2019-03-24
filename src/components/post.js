import React from 'react';

function eachComment(content) {
  let arr = []
  for (let i of content) {
    let s = i.split('.');
    let f = s[0];
    s.shift();
    s = s.toString();
    arr.push(<p><b>{f}</b>{s}</p>);
  }
  return arr;
}

export default function Post(props) {
  return (
    <div>
      <h1>
        {props.title}
      </h1>
      <div>
        {eachComment(props.content)}
      </div>
    </div>
  );
}
