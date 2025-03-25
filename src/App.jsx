import { useState } from 'react'
import './index.css';
import WaitTime from './components/WaitTime';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Phanta-Project</h1>
      <WaitTime/>
    </div>
  );
}

export default App;

