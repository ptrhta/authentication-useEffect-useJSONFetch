import { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

import AuthContext from './../../../contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: '16px'
    }
  }));

export default function Login() {
    const classes = useStyles();

    const [form, setForm] = useState({
        username: '',
        password: ''
      });
      const { isAuth, login } = useContext(AuthContext);
    
      const handleChange = event => {
        const name = event.target.name;
        const value = event.target.value;
    
        setForm(prevForm => ({
          ...prevForm,
          [name]: value
        }))
      };
    
      const handleSubmit = event => {
        const { username, password } = form;
    
        if (!isAuth && username !== '' && password !== '') {
          login(username, password);
        }
    
        event.preventDefault();
      };
    return (
        <form 
            onSubmit={handleSubmit}
            className={classes.root} 
            autoComplete="off"
        >
            <Input
                type="text" 
                placeholder="Username"
                name="username"
                onChange={handleChange}
            />
            <Input 
                type="password"
                placeholder="Password"
                name="password" 
                onChange={handleChange}
            />
            <Button 
                type="submit"
                disabled={isAuth}
                variant="contained"
                color="inherit"
            >
                Login
            </Button>
        </form>
    )
}