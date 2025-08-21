import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Scannerform from './components/Scannerform';

function App() {

  return(
    <div>
      <h1 className="text-3xl font-bold mb-5 text-center">Scam Scanner</h1>
      <p>Not sure if that link is safe? Paste it here and let Scam Scanner do the work. We’ll quickly check it against trusted sources so you can browse with confidence.
        
      </p>
      <Scannerform/>
    </div>
  );
}

export default App
