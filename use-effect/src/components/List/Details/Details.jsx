import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function Details(props) {
    const [isLoading, setLoading] = useState(false);
    const [user, setUser] = useState({});

    const info = props.info;
    const classes = useStyles();

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            try {
             const response = await fetch(`https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/${props.info.id}.json`);
             if (!response.ok) {
               throw new Error(response.statusText);
            }
            const user = await response.json();
            setUser(user);
            } catch(e) {
               console.log(e);
            } finally {
               setLoading(false);
            }
        };
      
        fetchDetails();

    }, [props.info.id]);

    return(
       <>
        {
            isLoading && <CircularProgress disableShrink />
        }
        {
            (Object.keys(user).length === 0) ? null :
            <Card className={classes.root}>
                <CardMedia
                    component="img"
                    alt={user.name}
                    image={user.avatar}
                    title={user.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {user.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {user.details.city}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {user.details.company}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {user.details.position}
                    </Typography>
                </CardContent>
            </Card>
        }
       </>
    )
}

Details.propTypes = {
    info: PropTypes.shape({
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
          ]),
        name: PropTypes.string
    })
};