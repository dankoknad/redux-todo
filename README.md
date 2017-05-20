## Redux Todo list

This is IMHO more readable and undersandable example than [official](https://github.com/reactjs/redux/tree/master/examples/todos). Some confusing parts like this [`todo` constant](https://github.com/reactjs/redux/blob/master/examples/todos/src/reducers/todos.js#L1-L21) has been removed. Basicaly, `todo` is helper method which looks like a reducer - but it is **not**. It is function which is passed to the `todos` reducer. Yeah, it gets `state` and `action` as parameters like reducer should - but still, `todo` constant is not a reducer.

Now, instead of having this:
```js
const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state
      }

      return {
        ...state,
        completed: !state.completed
      }
    default:
      return state
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ]
    case 'TOGGLE_TODO':
      return state.map(t =>
        todo(t, action)
      )
    default:
      return state
  }
}

export default todos

```
in `src/reducers/todos.js` we have just this:

```js
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    case 'TOGGLE_TODO':
      return state.map(todo => 
        (todo.id !== action.id) 
          ? todo 
          : {...todo, completed: !todo.completed}
      )
    default:
      return state
  }
}
 
export default todos

```
Also `getVisibleTodos` in [src/containers/VisibleTodoList.js](https://github.com/reactjs/redux/blob/master/examples/todos/src/containers/VisibleTodoList.js#L5-L16) is updated so instead of using switch statement, `if` conditional has been used.
```js
const  getVisibleTodos = (todos, filter) => {
 if (filter === 'SHOW_ALL') {return todos} 
 if (filter === 'SHOW_COMPLETED') {return todos.filter(t => t.completed)} 
 if (filter === 'SHOW_ACTIVE') {return todos.filter(t => !t.completed)}
}

```


I have added initiall store in `src/index.js`:
```js
const initiallStore = {
  visibilityFilter: 'SHOW_ALL',
  todos: [
    { 
      id: 1,
      text: 'First, learn React well',
      completed: true,
    },{ 
      id: 2,
      text: 'Consider using Redux',
      completed: true,
    },{
      id: 3,
      text: 'Keep all state in a single tree',
      completed: false
    }
  ]
}

```


 and [`redux-logger`](https://github.com/evgenyrodionov/redux-logger) so I can track reducers, actions and store more easily.
```js
// src/index.js

// some code has been omitted

import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger'

const logger = createLogger({ 
  collapsed: !false
});

const store = createStore(
  todoApp,
  initiallStore,
  applyMiddleware(logger)
)

```

