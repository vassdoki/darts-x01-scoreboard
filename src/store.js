import { createStore } from 'redux'
import DartsReducer from './reducers'
let store = createStore(DartsReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export {store};
