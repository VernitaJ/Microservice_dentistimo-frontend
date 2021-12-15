import './App.css'
import Map from './components/Map'
import { useEffect,useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {

  return (
      <div>
        <Header />
        <Map />
        <Footer />
      </div>
  )
}

export default App
