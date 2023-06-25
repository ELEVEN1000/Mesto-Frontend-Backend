import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';

// const express = require('express');
// const { PORT = 3000 } = process.env;
// const app = express();
//
// app.listen(PORT, () => {
//   console.log(`App listening on port ${PORT}`)
// })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

