import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router,Route, Routes,  } from "react-router-dom";
import PrivateRoute from './context/PrivateRoute';
import { UserProvider } from './context/UserContext';

import Authentication from './components/Authentication';
import About from './screens/About';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
    <Router>
    <Routes>
      <Route path='/' element={<Authentication />}/>
      <Route path='/dashboard' element={<PrivateRoute><App/></PrivateRoute>}/>
      <Route path='/about' element={<About/>}/>
    </Routes>
    </Router>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
