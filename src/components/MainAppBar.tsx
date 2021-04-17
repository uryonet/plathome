import React, { useState } from 'react'
import { Link, Switch, useHistory } from 'react-router-dom'
import { useMsal } from '@azure/msal-react'
import {
  AppBar,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  SwipeableDrawer,
  Toolbar
} from '@material-ui/core'
import { ArrowBack, AssignmentTurnedIn, Home, Menu, MenuBook, MoreVert } from '@material-ui/icons'
import PrivateRoute from '../lib/PrivateRoute'
import NewTaskDialog from '../features/tasks/NewTaskDialog'

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
    zIndex: 0
  },
  grow: {
    flexGrow: 1
  },
  routeLink: {
    textDecoration: 'none',
    color: theme.palette.text.primary
  }
}))

const MainAppBar: React.FC = () => {
  const { instance } = useMsal()
  const classes = useStyles()
  const history = useHistory()
  const [isShow, setIsShow] = useState(false)
  const toggleDrawer = (status: boolean) => () => {
    setIsShow(status)
  }

  const menuList = () => (
    <Container onClick={toggleDrawer(false)}>
      <List>
        <Link to="/" className={classes.routeLink}>
          <ListItem button>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText>ホーム</ListItemText>
          </ListItem>
        </Link>
        <Link to="/tasks" className={classes.routeLink}>
          <ListItem button>
            <ListItemIcon>
              <AssignmentTurnedIn />
            </ListItemIcon>
            <ListItemText>タスク</ListItemText>
          </ListItem>
        </Link>
        <Link to="notes" className={classes.routeLink}>
          <ListItem button>
            <ListItemIcon>
              <MenuBook />
            </ListItemIcon>
            <ListItemText>ノート</ListItemText>
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={() => instance.logoutRedirect()}>
          <ListItemText>ログアウト</ListItemText>
        </ListItem>
      </List>
    </Container>
  )

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Switch>
        <PrivateRoute path="/tasks/:taskId">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={() => history.goBack()}>
              <ArrowBack />
            </IconButton>
          </Toolbar>
        </PrivateRoute>
        <PrivateRoute path="/tasks">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
              <Menu />
            </IconButton>
            <div className={classes.grow} />
            <IconButton edge="end" color="inherit">
              <MoreVert />
            </IconButton>
          </Toolbar>
          <SwipeableDrawer
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            open={isShow}
            anchor="bottom"
            disableSwipeToOpen={true}
          >
            {menuList()}
          </SwipeableDrawer>
          <NewTaskDialog />
        </PrivateRoute>
        <PrivateRoute path="/">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
              <Menu />
            </IconButton>
            <div className={classes.grow} />
            <IconButton edge="end" color="inherit">
              <MoreVert />
            </IconButton>
          </Toolbar>
          <SwipeableDrawer
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            open={isShow}
            anchor="bottom"
            disableSwipeToOpen={true}
          >
            {menuList()}
          </SwipeableDrawer>
        </PrivateRoute>
      </Switch>
    </AppBar>
  )
}

export default MainAppBar
