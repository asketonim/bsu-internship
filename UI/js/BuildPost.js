const buildPost = (post) => {
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
        <span class="date m-opacity">${post.createdAt}</span>
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
};
