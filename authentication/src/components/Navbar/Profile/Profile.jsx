import { useContext } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

import AuthContext from './../../../contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
    profile: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: '16px'
      }
}));

export default function Profile() {
    const classes = useStyles();
    const { isProfileLoading, profile, logout } = useContext(AuthContext);
    
    const handleLogoutClick = () => logout();

    return (
        <>
            {isProfileLoading && (
                <CircularProgress disableShrink />
            )}
            {!isProfileLoading && profile && (
                <div className={classes.profile}>
                    <span>Hello, {profile.name}</span>
                    <Avatar alt={profile.name} src={profile.avatar} />
                    <Button 
                        type="button"
                        variant="contained"
                        onClick={handleLogoutClick}
                        color="inherit"
                    >
                        Logout
                    </Button>
                </div>
            )}
        </>
    )
}