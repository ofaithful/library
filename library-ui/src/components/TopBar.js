import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AssignmentIcon from '@material-ui/icons/Assignment'
import { Link } from 'react-router-dom'
import Divider from '@material-ui/core/Divider'
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  title: {
    flexGrow: 1
  },
  root: {
    flexGrow: 1,
  },
  noUnderline: {
    textDecoration: 'none'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}))

const TopBar = ({ userLogoutAction, title, isAdmin }) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Link to="/" className={classes.noUnderline}>
          <ListItem button key='Available books'>
            <ListItemIcon><LibraryBooksIcon /></ListItemIcon>
            <ListItemText primary='Available books' />
          </ListItem>
        </Link>
        <Link to="/borrowings" className={classes.noUnderline}>
          <ListItem button key='Borrowings'>
            <ListItemIcon><AssignmentIcon /></ListItemIcon>
            <ListItemText primary='Borrowings' />
          </ListItem>
        </Link>
        { isAdmin ?
          <>
            <Divider />
            <Link to="/add-book" className={classes.noUnderline}>
              <ListItem button key='Add book'>
                <ListItemIcon><AddIcon /></ListItemIcon>
                <ListItemText primary='Add book' />
              </ListItem>
            </Link>
            <Link to="/add-author" className={classes.noUnderline}>
              <ListItem button key='Add author'>
                <ListItemIcon><AccessibilityNewIcon /></ListItemIcon>
                <ListItemText primary='Add author' />
              </ListItem>
            </Link>
          </> :
          null
        }
      </List>
    </div>
  );

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Button onClick={toggleDrawer('left', true)} color='inherit'><MenuIcon /></Button>
            <Drawer anchor='left' open={state.left} onClose={toggleDrawer('left', false)}>
              {list('left')}
            </Drawer>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            { title }
          </Typography>
          <Button color="inherit" onClick={userLogoutAction}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default TopBar