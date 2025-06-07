import './App.css';
import Menubar from './components/Menubar';
import FooterPage from './components/FooterPage';
import MainRouter from './components/MainRouter';

function App() {
  const basename = process.env.PUBLIC_URL;
  return (
      <div>
        <img src={`${basename}/home.jpg`} width='100%'/>
        <Menubar/>
        <MainRouter/>
        <FooterPage/>
      </div>
  );
}

export default App;
