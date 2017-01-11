import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import appReducer from './reducers'
import App from './components/App'
import persistState from 'redux-localstorage'

// const store = createStore(appReducer)

import './index.css';
import './flexbox.css';

const enhancer = compose(
  persistState()
)

const store = createStore(
  appReducer,
  enhancer
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
