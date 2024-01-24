import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';

import 'materialize-css/dist/css/materialize.min.css';

import App from './components/App';
import reducers from './reducers';

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

const store = createStore(reducers, {}, applyMiddleware(thunk));

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

console.log('stripe key: ', process.env.REACT_APP_STRIPE_KEY, process.env.NODE_ENV)