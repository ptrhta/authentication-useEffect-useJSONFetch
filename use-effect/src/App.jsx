import Container from '@material-ui/core/Container';
import List from './components/List/List';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    gap: '100px',
    marginTop: '64px'
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <Container className={classes.root}>
        <List />
      </Container>
    </div>
  );
}

export default App;
