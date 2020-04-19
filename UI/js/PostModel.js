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

  static _parseDate(stringDate) {
    const reg = /\d{1,2}\/\d{1,2}\/\d{4}/;
    if (stringDate.match(reg)) {
      const parseDate = stringDate
        .split('/')
        .map((item) => parseInt(item, 10));
      return new Date(parseDate[2], parseDate[1] - 1, parseDate[0]);
    }
    return false;
  }

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
      const filterDate = PostModel._parseDate(filterConfig.createdAt.date);
      if (filterDate) {
        extractedPosts = extractedPosts
          .filter((post) => {
            if (filterConfig.createdAt.before) return post.createdAt < filterDate;
            return post.createdAt > filterDate;
          });
      }
    }
    if (filterConfig.hashtags) {
      extractedPosts = extractedPosts
        .filter((post) => post.hashtags
          .some((hashtag) => filterConfig.hashtags.includes(hashtag)));
    }

    extractedPosts = extractedPosts.slice(skip, skip + top);

    return extractedPosts.sort((a, b) => a - b);
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
        || !(post.createdAt instanceof Date)
        || PostModel._validateAuthor(post.author)) return false;

    if (post.likes
        && post.likes.filter((author) => !PostModel._validateAuthor(author)).length) return false;
    if (post.hashtags
        && post.hashtags.filter((hashtag) => typeof hashtag !== 'string').length) return false;

    return true;
  }

  add(post) {
    const newPost = { ...post, ...{ id: Math.round(Date.now() * Math.random()) } };
    console.log(newPost);
    if (PostModel.validate(newPost)) {
      this._posts.push(newPost);
      return true;
    }
    return false;
  }

  _addAll(posts) {
    this._posts = this._posts.concat(posts.filter((post) => PostModel.validate(post)));
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
