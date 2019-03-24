import React from 'react';

function eachComment(content) {
  let arr = []
  for (let i of content) {
    arr.push(<p>{i}</p>)
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
