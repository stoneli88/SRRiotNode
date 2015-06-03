var riot = require('riot');
var todo = require('./todo.html');

riot.mount('todo', {
  title: 'I want to behave!',
  items: [
    {title: 'Avoid excessive coffeine', done: true},
    {title: 'Hidden item', hidden: true},
    {title: 'Be less provocative'},
    {title: 'Be nice to people'}
  ]
});
