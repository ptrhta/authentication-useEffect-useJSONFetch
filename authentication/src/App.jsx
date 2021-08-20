import Container from '@material-ui/core/Container';
import AuthProvider from './components/AuthProvider/AuthProvider';
import Navbar from './components/Navbar/Navbar';
import Content from './components/Content/Content';

import './App.css';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Navbar />
        <Container>
          <Content />
        </Container>
    </AuthProvider>
    </div>
  );
}

export default App;
