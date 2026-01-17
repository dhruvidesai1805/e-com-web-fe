import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

if (import.meta.env.MODE === 'production') {
	axios.defaults.baseURL = 'https://e-com-web-be.vercel.app';
}

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
