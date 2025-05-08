import Main from './containers/Main'
import Instructions from './containers/Instructions'
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Main />} />
        <Route exact path='/instructions' element={<Instructions />} />
      </Routes>
    </Router>
  );
}

export default App;
