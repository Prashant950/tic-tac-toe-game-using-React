import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Board from './App';
import reportWebVitals from './reportWebVitals';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Board />
  </React.StrictMode>
);

reportWebVitals();
