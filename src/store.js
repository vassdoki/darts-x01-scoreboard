import { createStore } from 'redux'
import myApp from './reducers'
let store = createStore(myApp);
export {store};
