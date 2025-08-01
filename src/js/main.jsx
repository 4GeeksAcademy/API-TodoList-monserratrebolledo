import React from 'react'
import ReactDOM from 'react-dom/client'
import TodoList from './TodoList';
import "bootstrap/dist/css/bootstrap.min.css";

//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap"

// index.css'
import '../styles/index.css'

// components
import Home from './components/Home';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TodoList/>
    <Home/>
  </React.StrictMode>,
)