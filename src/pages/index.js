import React, { Component } from 'react';
import axios from 'axios';

import Page from '../layouts/main';

import Post from '../components/post';
import Error from '../components/error';


/**
 * The way this works is:
 * - First load (Server Rendering) saves everything to props
 *  (so that it doesn't have to derive state from props)
 * - Any other load after that saves to state
 */

/**
 * 1. Send request to API with a list of IDs that it has loaded so far
 * - Server pulls random post from DB
 * - if post id is in array, pull next random post
 * - if post id is not in array, serve this post
 * 2. Server responds with a key/value pair of Ids/Posts
 * 3. SetState to keep track of all the IDs that were loaded.
 * 4. Repeat on Scroll
 */

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMore: true,
      used: [],
      posts: [],
      loading: false
    };

    window.onscroll = async () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 150 &&
        !this.state.loading
      ) {
        this.setState({ loading: true });
        await this.loadMoreData();
        this.setState({ loading: false });
      }
    }

    this.loadMoreData = this.loadMoreData.bind(this);
  }

  async componentWillMount() {
    await this.loadMoreData();
  }

  // This loads data from the API and sets it to the state (using this.loadData)
  async loadMoreData() {
    /**
     * 1. Fetch data from API
     * 2. Set State with new posts list (merge/push them to the current posts list)
     * 3. Also SetState with whether or not it hasMore posts to load (if new posts list is empty, false)
     * 4. This causes a re-render
     */

    // TODO: Pass Object.keys(posts) (to pass currently loaded posts)
    // Load data from the API
    const { data } = await axios.post('http://35.247.79.142/api', { 'used': this.state.posts.map(post => post.id) });
    if (data == null) {
      this.setState({ hasMore: false });
      return;
    }
    const newPosts = { id: data[0], title: data[1], content: data[2] }

    this.setState((previousState) => ({
      // Merge current and new posts
      posts: previousState.posts.concat(newPosts),
      // Update whether or not it has more posts
      hasMore: newPosts.length !== 0
    }), () => { /*console.log(this.state);*/ });
  }

  render() {
    // Merge props and state to render it
    const data = this.state.posts;
    return (
      <Page>
        {
          data && data.length > 0
            ? (<div id='posts'>
              {
                data.map((post) => (
                  <Post title={post.title} content={post.content} key={post.id} />
                ))
              }
            </div>)
            : <Error message='Could not load posts, please try again.' />
        }
      </Page>
    );
  }
}
