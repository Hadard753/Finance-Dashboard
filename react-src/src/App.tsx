import React from 'react';
import './App.css';
import Header from './components/layout/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
     <Header brandName="Finance-dashboard" links={[{href: "#home", label: "Home"}]} bg="dark" variant="dark"/>
    </div>
  );
}

export default App;
