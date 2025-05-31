import './App.css';
import { Routes, Route } from 'react-router-dom';
import Menubar from './components/Menubar';
import FooterPage from './components/FooterPage';
import PostRouter from './components/PostRouter';

function App() {
  const basename = process.env.PUBLIC_URL;
  return (
      <div>
        <img src={`${basename}/home.jpg`} width='100%'/>
        <Menubar/>
        <Routes>
          <Route path="/post/*" element={<PostRouter />} />
        </Routes>
        <FooterPage/>
      </div>
  );
}

export default App;
