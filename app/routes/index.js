import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    this.store.push({
      data: [{
        id: 1,
        type: 'post',
        attributes: {
          title: 'testing',
          body: 'blablabla',
          imgUrl: 'https://s26162.pcdn.co/wp-content/uploads/2015/08/big-bukowski-1240x616.jpg',
          imgAlt: 'lknjklsajf',
          imgCapt: 'jhkjhkj',
          category: 'asfasf',
          timestamp: '123124255125',
        }
      },
        {
          id: 2,
          type: 'post',
          attributes: {
            title: 'hoho',
            body: 'blablabla',
            imgUrl: 'https://s26162.pcdn.co/wp-content/uploads/2015/08/big-bukowski-1240x616.jpg',
            imgAlt: 'lknjklsajf',
            imgCapt: 'jhkjhkj',
            category: 'asfasf',
            timestamp: '123124255125',
        }
      }]
    });
    return this.store.findAll('post');

  }
});
