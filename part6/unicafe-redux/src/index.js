import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import App from './App'
import counterReducer from './reducers/counterReducer'

const store = createStore(counterReducer)

const renderApp = () => {
  ReactDOM.render(<App store={store} />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)