import React, { useState } from 'react';
import axios from 'axios';
import GraphViewer from './components/GraphViewer';
import './styles/App.css';

function App() {
  const [regex, setRegex] = useState('');
  const [automaton, setAutomaton] = useState(null);

  const handleConvert = async (type) => {
    if (!regex) return alert('Enter a regular expression');
    const res = await axios.post('https://regex-nfa-dfa-backend-production.up.railway.app/api/convert', { regex, type });;
    setAutomaton(res.data);
  };

  return (
    <div className="app">
      <h1>Regex to NFA/DFA Converter</h1>
      <input
        type="text"
        value={regex}
        onChange={(e) => setRegex(e.target.value)}
        placeholder="Enter regex"
      />
      <div className="buttons">
        <button onClick={() => handleConvert('nfa')}>Convert to NFA</button>
        <button onClick={() => handleConvert('dfa')}>Convert to DFA</button>
      </div>
      {automaton && <GraphViewer data={automaton} />}
    </div>
  );



}

export default App;