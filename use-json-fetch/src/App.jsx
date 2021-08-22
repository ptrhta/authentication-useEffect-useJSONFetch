import Resource from './components/Resource';
import './App.css';

function App() {
  return (
    <div className="App">
      <Resource url={"http://localhost:7070/data"} />
      <Resource url={"http://localhost:7070/error"} />
      <Resource url={"http://localhost:7070/loading"} />
    </div>
  );
}

export default App;
