import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import manager from './modules/manager'
import { loadState, saveState } from './localStorage'
import throttle from 'lodash/throttle'

export const history = createBrowserHistory()

const persistedState = loadState();
const enhancers = []
const middleware = [
  thunk,
  routerMiddleware(history)
]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const rootReducer = combineReducers({
  manager: manager,
  router: connectRouter(history),
})

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
  connectRouter(history)(rootReducer),
  persistedState,
  composedEnhancers
)

store.subscribe(throttle(() => {
  saveState({
    manager: store.getState().manager
  });
}, 1000));

export default store