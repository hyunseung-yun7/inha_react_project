import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Menubar from './components/Menubar';
import FooterPage from './components/FooterPage';
function App() {
  return (
    <Router>
      <div>
        <img src='https://picsum.photos/960/150'/>
        {/* <img src='./home.jpg' width='100%'/> */}
        <Menubar/>
        <FooterPage/>
      </div>
    </Router>
  );
}

export default App;
