import { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import AuthContext from './../../contexts/AuthContext';

import Login from './Login/Login';
import Profile from './Profile/Profile';


const useStyles = makeStyles((theme) => ({
    title: {
      marginRight: theme.spacing(2),
    },
    toolbar: {
        justifyContent: 'space-between'
    }
  }));

  export default function Navbar() {
    const { isLoggedIn } = useContext(AuthContext);
    const classes = useStyles();
    
    return (
      <nav>
        <AppBar color="transparent" position="static">
          <Container>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h6" className={classes.title}>
                Neto Social
                </Typography>
                {!isLoggedIn ? (
                    <Login />
                ) : (
                    <Profile />
                )}
            </Toolbar>
          </Container>
        </AppBar>
      </nav>
    );
  }