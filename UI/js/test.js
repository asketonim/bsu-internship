const print = console.log

print('GetPosts function test:\n');
print('GetPosts(0, 10): ');
window.api.getPosts(0, 10).forEach(post => print(post));
print('GetPosts(0, 10, {author: \'asketonim\'}): ');
window.api.getPosts(0, 10, {author: 'asketonim'}).forEach(post => print(post));
print('GetPosts(3, 3): ');
window.api.getPosts(3, 3).forEach(post => print(post));
print('\n');

print('GetPost function test: \n');
print('GetPost(3):');
print(window.api.getPost(3));
print('GetPost(\'fe\'):');
print(window.api.getPost('fe'));
print('GetPost(10):');
print(window.api.getPost(10));

print('ValidatePost function test(validating all posts):')
print(window.api.validateAllPosts());

print('AddPost function test [valid, valid, not valid]:')
const post1 = {
  id: 25,
  author: {
    id: 2,
    name: 'Andrey Alekseev',
    username: 'asket'
  },
  description: 'Contr Lorem Ipsum is not simply random text. Contrary to popular belief, Lorem Ipsum is not simply random text.',
  createdAt: new Date('2020-03-17T23:00:00'),
  likes: [],
}
const post2 = {
  id: 26,
  author: {
    id: 2,
    name: 'Andrey Alekseev',
    username: 'asket'
  },
  description: 'Contr Lorem Ipsum is not simply random text. Contrary to popular belief, Lorem Ipsum is not simply random text.',
  createdAt: new Date('2020-03-17T23:00:00'),
  likes: [],
}
const post3 = {
  id: '27',
  author: {
    id: 2,
    name: 'Andrey Alekseev',
    username: 'asket'
  },
  description: 'Contr Lorem Ipsum is not simply random text. Contrary to popular belief, Lorem Ipsum is not simply random text.',
  createdAt: new Date('2020-03-17T23:00:00'),
  likes: [],
}
print(window.api.addPost(post1));
print(window.api.addPost(post2));
print(window.api.addPost(post3));

print('EditPost function test [valid, not valid]');
print('Before editing:')
print(window.api.getPost(5))
const config1 = {
  description: 'Hello there!'
}
print(window.api.editPost(5, config1))
print('After editing:')
print(window.api.getPost(5))

print('Before editing:')
print(window.api.getPost(7))
const config2 = {
  description: 666
}
print(window.api.editPost(7, config2))
print('After editing:')
print(window.api.getPost(7))