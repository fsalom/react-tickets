import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './presentation/App';
import reportWebVitals from './reportWebVitals';
import '@fontsource/roboto';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

reportWebVitals();