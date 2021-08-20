import { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AuthContext from './../../contexts/AuthContext';
import News from './News/News';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      borderRadius: 0,
      marginTop: '64px',
      padding: '64px',
      backgroundColor: 'ghostwhite',
      boxShadow: '0px 1px 1px -1px rgb(0 0 0 / 12%), 0px 1px 1px 0px rgb(0 0 0 / 12%), 0px 0px 0px 1px rgb(0 0 0 / 12%)'
    },
    title: {
      fontSize: 14,
    },
    content: {
        padding: '16px'
    }
  });

export default function Content() {
    const classes = useStyles();
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <div className="content">
        {!isLoggedIn ? (
            <Card className={classes.root}>
              <CardContent className={classes.content}>
                <Typography variant="h5" component="h1">
                    Neto Social
                </Typography>
                <Typography variant="body2" component="p">
                    Facebook and VK killer
                </Typography>
              </CardContent>
            </Card>
        ) : (
          <News />
        )}
        </div>
    )
}