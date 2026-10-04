import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Canvas from './components/Canvas.jsx';
import SidePanel from './components/SidePanel.jsx';
import BottomPanel from './components/BottomPanel.jsx';

function App() {
  return (
    <div id='main'>
      <SidePanel />
      <Canvas />
      <BottomPanel />
    </div>
  )
}

export default App
