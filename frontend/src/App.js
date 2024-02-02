import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./components/Home/Home"
import WordDefinitions from "./components/WordDefinitions/WordDefinitions"

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/:word" element={<WordDefinitions/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;