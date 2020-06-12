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

  static _buildPost(post) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const newPost = document.createElement('article');
    newPost.classList.add('post');
    newPost.innerHTML = `
      <div class="img-holder">
        <img class="profile-photo" src="./assets/profile-photo.svg" alt="Profile photo" />
      </div>
      <div>
        <div class="post-info">
          <span>${post.author.name}</span>
          <span class="m-opacity">@${post.author.username}</span>
          <span class="date m-opacity">
            ${post.createdAt.getDay()} ${months[post.createdAt.getMonth()]} ${post.createdAt.getFullYear()}
          </span>
        </div>
        <p class="post-content xs-opacity">
          ${post.description}
        </p>
        <div class="buttons-holder">
          <div class="like-button m-opacity">
            <button><img class="heart-icon" src="./assets/heart.png" alt="heart-icon" /></button>
            <span class="s-opacity">${post.likes.length}</span>
          </div>
          <div class="auth-buttons">
            <button class="auth-button btn smooth">Edit</button>
            <button class="auth-button btn smooth">Delete</button>
          </div>
        </div>
      </div>
    `;
    return newPost;
  }

  static _updatePosts(posts) {
    const container = document.querySelector('.posts');
    posts.forEach((post) => {
      container.appendChild(PostModel._buildPost(post));
    });
  }

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
    PostModel._updatePosts(extractedPosts.sort((a, b) => a - b));

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
    newPost.createdAt = new Date();
    if (PostModel.validate(newPost)) {
      this._posts.push(newPost);
      PostModel._updatePosts(this._posts);
      return true;
    }
    return false;
  }

  _addAll(posts) {
    this._posts = this._posts.concat(posts.filter((post) => PostModel.validate(post)));
    PostModel._updatePosts(this._posts);
  }

  edit(id, editInfo) {
    const index = this._posts.findIndex((post) => post.id === id);
    const editedPost = { ...this._posts[index], ...editInfo };
    if (PostModel.validate(editedPost)) {
      this._posts[index] = { ...editedPost };
      PostModel._updatePosts(this._posts);
      return true;
    }
    return false;
  }

  remove(id) {
    this._posts = this._posts.filter((post) => post.id !== id);
    PostModel._updatePosts(this._posts);
  }

  clear() {
    this._posts = [];
    PostModel._updatePosts(this._posts);
  }
}

(() => {
  window.displayedPosts = new PostModel(posts);
})();
