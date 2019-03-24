export default function Post (props) {
  return (
    <div>
      <h1>
        { props.title }
      </h1>
      <div>
        { props.content }
      </div>
    </div>
  );
}
