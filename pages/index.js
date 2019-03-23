import Page from '../layouts/main';

import Post from '../components/post';
import Error from '../components/error';

export default (props) => (
  <Page>
    {
      props.posts
        ? (<div id='posts'>
          {
            props.posts.map(post => (
              <Post title={post.title} content={post.content} />
            ))
          }
        </div>)
        : <Error message='Could not load posts, please try again.' />
    }
  </Page>
);
