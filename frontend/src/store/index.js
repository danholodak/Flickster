import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk'
import photosReducer from './photos';
import sessionReducer from './session';
import usersReducer from './users';
import commentsReducer from './comments';
import testimonialsReducer from './testimonials';
import albumsReducer from './albums';

export const rootReducer = combineReducers({
  session: sessionReducer,
  users: usersReducer, 
  photos: photosReducer,
  comments: commentsReducer,
  testimonials: testimonialsReducer, 
  albums: albumsReducer
})

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
  } else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
  }

const configureStore = (preloadedState = {}) => {
    return createStore(rootReducer, preloadedState, enhancer)
}
export default configureStore