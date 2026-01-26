import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import './App.css'
import Fin from './pages/Fin';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trouveleproduit/game" element={<Game />} />
        <Route path="*" element={<Home />} />
        <Route path="/trouveleproduit/fin" element={<Fin />} />
      </Routes>
  );
}

export default App;