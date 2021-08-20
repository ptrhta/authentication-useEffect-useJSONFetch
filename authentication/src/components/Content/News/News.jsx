import { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import AuthContext from './../../../contexts/AuthContext';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      height: '100%'
    },
    media: {
      height: 140,
    },
    news: {
      display: 'flex',
      gap: '16px',
      marginTop: '65px'
    },
    loading: {
      display: 'flex',
      marginTop: '65px',
      justifyContent: 'center'
    }
});

export default function News() {
    const classes = useStyles();

    const [isLoading, setIsLoading] = useState(false);
    const [news, setNews] = useState([]);
    const { isLoggedIn, token, logout } = useContext(AuthContext);

    useEffect(() => {
        let isSubscribed = true;
    
        const fetchNews = async () => {
          if (!isLoggedIn) {
            return;
          }
    
          setIsLoading(true);
    
          try {
            const response = await fetch(process.env.REACT_APP_NEWS_URL, {
              method: 'get',
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
    
            setIsLoading(false);
    
            if (!response.ok && response.status === 401) {
              logout();
              return;
            }
    
            if (!response.ok) {
              throw new Error(response.statusText);
            }
    
            const data = await response.json();
    
            setNews(data);
          } catch (error) {
            if (isSubscribed) {
              setIsLoading(false);
            }
    
            alert(error.message);
          }
        };
    
        fetchNews();
    
        return () => {
          isSubscribed = false;
        };
      }, [isLoggedIn]);

    return(
        <>
        {isLoading && (
        <div className={classes.loading}>
            <CircularProgress disableShrink />
        </div>
      )}
      {!isLoading && news.length > 0 && (
        <div className={classes.news} >
          {news.map(item => (
            <Grid key={item.id} item xs={3}>
             <Card className={classes.root}>
                <CardMedia
                  className={classes.media}
                  image={item.image}
                  title={item.title}
                />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {item.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {item.content}
                    </Typography>
                 </CardContent>
              </Card>
            </Grid>
          ))}
        </div>
      )}
        </>
    )
}