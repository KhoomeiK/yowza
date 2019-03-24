import React, { Component } from 'react';
import { withRouter } from 'next/router';
// import fetch from 'unfetch';
import InfiniteScroll from 'react-infinite-scroller';

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

class Index extends Component {
  componentWillMount () {
    this.setState({
      hasMore: false,
      posts: {}
    });
  }

  // This loads data from the API and sets it to the state (using this.loadData)
  async loadMoreData () {
    /**
     * 1. Fetch data from API
     * 2. Set State with new posts list (merge/push them to the current posts list)
     * 3. Also SetState with whether or not it hasMore posts to load (if new posts list is empty, false)
     * 4. This causes a re-render
     */

    // TODO: Pass Object.keys(posts) (to pass currently loaded posts)
    // Load data from the API
    // const res = await fetch('API_HERE');
    // console.log(res.text());
    // const data = await res.json();
    const data = {
      'id2': {
        title: 'Title 2',
        content: 'Content 2'
      }
    };

    this.setState((previousState) => ({
      // Merge current and new posts
      posts: Object.assign(previousState, data),
      // Update whether or not it has more posts
      hasMore: Object.values(data).length === 0
    }));
  }

  // Returns every currently loaded posts
  getLoadedPosts () {
    let data = {};
    if (this.props && this.props.router && this.props.router.query.posts) {
      data = Object.assign(data, this.props.router.query.posts || {});
    }
    if (this.state && this.state.posts) {
      data = Object.assign(data, this.state.posts || {});
    }
    return data;
  }

  render () {
    // Merge props and state to render it
    const data = this.getLoadedPosts();
    return (
      <Page>
        {
          data && Object.entries(data).length > 0
            ? (<div id='posts'>
              <InfiniteScroll
                initialLoad={false}
                loadMore={this.loadMoreData}
                hasMore={this.state ? this.state.hasMore : true}
                loader={<div className='loader' key={0}>Loading...</div>}
              >
                {
                  Object.entries(data).map((post) => (
                    <Post title={post[1].title} content={post[1].content} key={post[0]} />
                  ))
                }
              </InfiniteScroll>
            </div>)
            : <Error message='Could not load posts, please try again.' />
        }
      </Page>
    );
  }
}

export default withRouter(Index);
