import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home/Home.jsx'
import Header from './components/header/Header.jsx'
import './App.css'

const App = () => {
  return (
    <>
      <BrowserRouter> 
        <Header/>
        <Routes>
          <Route path='/' element = {<Home/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App