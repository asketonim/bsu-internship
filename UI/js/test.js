/* eslint-disable no-console */
/* eslint-disable no-undef */
(() => {
  const print = console.log;

  window.runTests = () => {
    const test = new PostModel(posts);

    print('~ Running tests for the PostModel methods ~');

    print('* test.getPage() function test *');
    print('test.getPage(0, 10): ');
    test.getPage(0, 10).forEach((post) => print(post));
    print('test.getPage(0, 10, {author: \'asketonim\'}): ');
    test.getPage(0, 10, { author: 'asketonim' }).forEach((post) => print(post));
    print('test.getPage(3, 3): ');
    test.getPage(3, 3).forEach((post) => print(post));
    print('\n');


    print('* test.get() function test: *');
    print('test.get(3):');
    print(test.get(3));
    print('test.get(\'fe\'):');
    print(test.get('fe'));
    print('test.get(10):');
    print(test.get(10));


    print('* test.add() function test [valid, valid, not valid]: *');
    const post1 = {
      id: 25,
      author: {
        id: 2,
        name: 'Andrey Alekseev',
        username: 'asket',
      },
      description: 'Contr Lorem Ipsum is not simply random text. Contrary to popular belief, Lorem Ipsum is not simply random text.',
      createdAt: new Date('2020-03-17T23:00:00'),
      likes: [],
    };
    print(test.add(post1));

    const post2 = {
      id: 26,
      author: {
        id: 2,
        name: 'Andrey Alekseev',
        username: 'asket',
      },
      description: 'Contr Lorem Ipsum is not simply random text. Contrary to popular belief, Lorem Ipsum is not simply random text.',
      createdAt: new Date('2020-03-17T23:00:00'),
      likes: [],
    };
    print(test.add(post2));

    const post3 = {
      id: '27',
      author: {
        id: 2,
        name: 'Andrey Alekseev',
        username: 'asket',
      },
      description: 'Contr Lorem Ipsum is not simply random text. Contrary to popular belief, Lorem Ipsum is not simply random text.',
      createdAt: new Date('2020-03-17T23:00:00'),
      likes: [],
    };
    print(test.add(post3));


    print('* test.edit() function test [valid, not valid] *');

    print('Before editing:');
    print(test.get(5));
    print(test.edit(5, { description: 'Hello there!' }));
    print('After editing:');
    print(test.get(5));

    print('Before editing:');
    print(test.get(7));
    print(test.edit(7, { description: 666 }));
    print('After editing:');
    print(test.get(7));
  };
})();
