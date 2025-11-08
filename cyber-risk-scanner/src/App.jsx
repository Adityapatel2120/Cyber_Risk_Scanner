import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Scannerform from './components/Scannerform';

function App() {

  return(
    <div className='flex flex-col items-center p-4'>
      <header className="fixed top-0 left-0 right-0 z-50  backdrop-blur-sm border-b border-gray-300">
        <h1 className="text-3xl font-bold text-center py-4
                 bg-gradient-to-r from-red-700 to-green-500 bg-clip-text text-transparent">
        Scam Scanner
        </h1>
      </header>

      <p className='w-full mt-10 max-w-2xl text-center'>Not sure if that link is safe? Paste it here and let Scam Scanner do the work. We’ll quickly check it against trusted sources so you can browse with confidence.</p>

      <div  className='mt-1 w-full max-w-xl'>
      <Scannerform/>
      </div>
    </div>
  );
}

export default App
