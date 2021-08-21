import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      minWidth: 300,
      backgroundColor: 'whitesmoke',
    },
  }));


export default function UsersList(props) {
    const card = props.card;
    const id = props.id;
    const handleClick = props.handleClick;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {card.map(row =>
            <ListItem 
                key={row.id}
                button
                onClick={() => handleClick(row)}
                className={(id === row.id) ? "active" : ""}
            >
                <ListItemText primary={row.name} />
            </ListItem>
            )}
       </div>
    )
}

UsersList.propTypes = {
    card: PropTypes.array,
    handleClick: PropTypes.func,
    id:PropTypes.number
};