/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line no-unused-vars
class PostModel {
  constructor(posts) {
    this._posts = [];
    this._addAll(posts || []);
  }

  // filterConfig = {
  //   author: 'something',
  //   createdAt: {
  //     date: 'day/month/year',
  //     before: true // true - before, false - after
  //   },
  //   hashtags: []
  // }

  getPage(skip = 0, top = 10, filterConfig) {
    let extractedPosts = [...this._posts];

    if (!filterConfig) return extractedPosts.slice(skip, skip + top);

    if (filterConfig.author) {
      extractedPosts = extractedPosts
        .filter((post) => post.author.name === filterConfig.author
          || post.author.username === filterConfig.author);
    }

    if (filterConfig.createdAt) {
      // only date of this type - 'day/month/year' - is considered correct
      const parseDate = filterConfig.createdAt.date
        .split('/')
        .map((item) => parseInt(item, 10));
      const filterDate = new Date(parseDate[2], parseDate[1] - 1, parseDate[0]);
      extractedPosts = extractedPosts
        .filter((post) => {
          if (filterConfig.createdAt.before) return post.createdAt < filterDate;
          return post.createdAt > filterDate;
        });
    }
    if (filterConfig.hashtags) {
      extractedPosts = extractedPosts
        .filter((post) => post.hashtags
          .filter((hashtag) => filterConfig.hashtags.includes(hashtag)).length);
    }

    extractedPosts = extractedPosts.length ? extractedPosts.slice(skip, skip + top) : [];

    return extractedPosts.sort((a, b) => {
      if (a.createdAt > b.createdAt) return 1;
      if (a.createdAt < b.createdAt) return -1;
      return 0;
    });
  }

  get(id) {
    return this._posts.find((post) => post.id === id);
  }

  static _validateAuthor(author) {
    return typeof author.id !== 'number' || typeof author.name !== 'string' || typeof author.username !== 'string';
  }

  static validate(post) {
    if (typeof post.id !== 'number'
        || typeof post.description !== 'string'
        || typeof post.createdAt !== 'object'
        || PostModel._validateAuthor(post.author)) return false;

    if (post.likes
        && post.likes.filter((author) => !PostModel._validateAuthor(author)).length) return false;
    if (post.hashtags
        && post.hashtags.filter((hashtag) => typeof hashtag !== 'string').length) return false;

    return true;
  }

  add(post) {
    if (PostModel.validate(post)) {
      this._posts.push(post);
      return true;
    }
    return false;
  }

  _addAll(posts) {
    this._posts = posts.filter((post) => PostModel.validate(post));
  }

  edit(id, editInfo) {
    const index = this._posts.findIndex((post) => post.id === id);
    const editedPost = { ...this._posts[index], ...editInfo };
    if (PostModel.validate(editedPost)) {
      this._posts[index] = { ...editedPost };
      return true;
    }
    return false;
  }

  remove(id) {
    this._posts = this._posts.filter((post) => post.id !== id);
  }

  clear() {
    this._posts = [];
  }
}
