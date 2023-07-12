import './App.css';
import Background from './Components/Background';
import Input from './Components/Input';
import Table from './Components/Table';

function App() {
  return (
    <div className="App">
      <Background />
      <Input />
      <div className="table-container">
        <Table />
      </div>
    </div>
  );
}

export default App;
