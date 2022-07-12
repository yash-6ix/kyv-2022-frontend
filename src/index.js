import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import logger from './services/logService';
import { createBrowserHistory } from 'history';
import './index.css';

const store = configureStore();
logger.init();
console.log('updated fe build')

const history = createBrowserHistory();

class Root extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <React.StrictMode>
                        <App />
                    </React.StrictMode>
                </Router>
            </Provider>
        );
    }
}

ReactDOM.render(<Root />, document.getElementById('root'));
