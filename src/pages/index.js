import React, { Component } from 'react';
import axios from 'axios';

import PageLayout from '../layouts/page';

import Post from '../components/post';
import Error from '../components/error';

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
  constructor (props) {
    super(props);
    this.state = {
      hasMore: true,
      used: [],
      posts: [],
      loading: true
    };

    window.onscroll = async () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 150 &&
        !this.state.loading
      ) {
        this.setState({ loading: true });
        await this.loadMoreData();
        this.setState({ loading: false });
      }
    };

    this.loadMoreData = this.loadMoreData.bind(this);
  }

  async componentWillMount () {
    const id = window.location.href.split('/')[3];
    await this.loadMoreData(id || undefined);
  }

  // This loads data from the API and sets it to the state (using this.loadData)
  async loadMoreData (id) {
    let newPosts;

    // TODO: remove hardcoded API path
    if (id) {
      // Load a specific post with the given ID
      const { data } = await axios.get('http://35.247.79.142/api/' + id);
      newPosts = { id: data[0], title: data[1], content: data[2] };
    } else {
      // Load any post that isn't currently loaded/used
      const { data } = await axios.post('http://35.247.79.142/api', { 'used': this.state.posts.map(post => post.id) });
      newPosts = { id: data[0], title: data[1], content: data[2] };
    }

    /**
     * 1. Fetch data from API
     * 2. Set State with new posts list (merge/push them to the current posts list)
     * 3. Also SetState with whether or not it hasMore posts to load (if new posts list is empty, false)
     * 4. This causes a re-render
     */

    // Load data from the API
    this.setState(previousState => ({
      // Merge current and new posts
      posts: previousState.posts.concat(newPosts),
      // Update whether or not it has more posts
      hasMore: newPosts.length !== 0,
      // Tell React that it's ready to render
      loading: false
    }));
  }

  render () {
    // Merge props and state to render it
    const { loading, posts } = this.state;

    if (posts && posts.length > 0) {
      return (
        <PageLayout>
          <div id='posts'>
            {
              posts.map((post) => (
                <Post
                  title={processTitle(post.title)}
                  content={post.content}
                  key={post.id}
                />
              ))
            }
          </div>
        </PageLayout>
      );
    } else if (loading) {
      return <PageLayout><p>Loading</p></PageLayout>;
    } else {
      return <PageLayout><Error message='Could not load posts, please try again.' /></PageLayout>;
    }
  }
}

function processTitle (rawTitle) {
  let finalTitle = rawTitle.trim();

  const regexp = /(.*)( of [Rr]eddit[:,]? ?)/g;
  const matches = regexp.exec(finalTitle);

  if (matches && matches.length > 0) {
    // TODO: Check if there is at least one "you" otherwise, replace your by "{match[1]}'s" See post /b5121a for example
    finalTitle = finalTitle
      .replace(regexp, '') // Remove __ of Reddit
      .split('your').join('their') // your -> their
      .split('you').join(matches[1].toLowerCase()) // you -> __
      .split('you').join('them') // Idk why this is but ok
      .trim(); // Remove extra spaces from manipulation
  }

  return (finalTitle.charAt(0).toUpperCase() + finalTitle.slice(1)).trim();
}
