## Redux Todo list

This is imho more readable and undersandable example. Some confusing parts like this [`todo` constant](https://github.com/reactjs/redux/blob/master/examples/todos/src/reducers/todos.js#L1-L21) has been removed. Basicaly, it was helper method which looks like a reducer - but it is not. It is function which is passed to the `todos` reducer.

Now, instead of
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
in `src/reducers/todos.js` we have:

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


I have added initial store in `src/index.js` and [`redux-logger`](https://github.com/evgenyrodionov/redux-logger) so I can track reducers, actions and store more easily.
