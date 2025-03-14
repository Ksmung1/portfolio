import '../css/App.css';
import '../css/props.css';

//screens
import Portfolio from '../screens/Portfolio';
import Deposits from '../screens/Deposits';
import About from '../screens/About';

function App() {
  return (
   
    <div className="App">
      <Deposits />
      <Portfolio></Portfolio>
    </div>
  );
}

export default App;
