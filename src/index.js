import registerServiceWorker from './registerServiceWorker';
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger'
import todoApp from './reducers'
import App from './components/App'

import './css/index.css'

const logger = createLogger({ 
	collapsed: !false
});


// const store = createStore(todoApp)

const initiallStore = {
  visibilityFilter: 'SHOW_ALL',
  todos: [
    { 
			id: 1,
      text: 'Learn React well',
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

const store = createStore(
  todoApp,
	initiallStore,
  applyMiddleware(logger)
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker();
