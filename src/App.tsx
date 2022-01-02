import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function App() {
  
  return (
    <div className="App">
      <Header />
      <Home />
    </div>
  );
}

export default App;
