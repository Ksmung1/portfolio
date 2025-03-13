import '../css/App.css';
import '../css/props.css';

//screens
import Portfolio from '../screens/Portfolio';
import Deposits from '../screens/Deposits';
function App() {
  return (
   
    <div className="App">
      <Deposits />
      <Portfolio></Portfolio>
    </div>
  );
}

export default App;
