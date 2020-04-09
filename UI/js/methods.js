;(()=>{

  const api = {};

  // filterConfig = {
  //   author: 'username'
  //   createdAt: '',
  //   hashtag: ''
  // }

  api.getPosts = ( skip = 0, top = 10, filterConfig ) => {
    const extractedPosts = posts.slice(skip, skip + top);

    if (!filterConfig) return extractedPosts;

    if (filterConfig.author) {
      extractedPosts = extractedPosts
        .filter(post => post.author.username === filterConfig.author || post.author.username === filterConfig.author);
    }

    if (filterConfig.createdAt)
      extractedPosts = extractedPosts.filter(post => post.createdAt === filterConfig.createdAt);
    if (filterConfig.hashtag) 
      extractedPosts = extractedPosts.filter(post => post.hashtags.includes(filterConfig.hashtag));

    return extractedPosts.sort((a, b) => a.createdAt < b.createdAt);
  }


  api.getPosts = id => posts.find(post => post.id === id);


  api.validatePost = post => {
    
    const validateAuthor = author => typeof author.id !== 'number' || typeof author.name !== 'string' || typeof author.username !== 'string';

    if (typeof post.id !== 'number' || 
        typeof  post.description !== 'string' || 
        typeof  post.createdAt !== 'object' ||
        validateAuthor(post.author)) return false;

    if (post.likes && post.likes.filter(author => !validateAuthor(author)).length) return false;
    if (post.hashtags && post.hashtags.filter(hashtag => typeof hashtag !== 'string').length) return false;

    return true;
  }

  api.addPost = post => {
    if (api.validatePost(post)) {
      posts.push(post);
      return true;
    }
    else return false;
  }

})();