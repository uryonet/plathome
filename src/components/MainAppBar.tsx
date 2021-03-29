import React, { useState } from 'react'
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
import { AssignmentTurnedIn, Home, Menu, MenuBook, MoreVert } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0
  },
  grow: {
    flexGrow: 1
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto'
  }
}))

const MainAppBar: React.FC = () => {
  const { instance } = useMsal()
  const classes = useStyles()
  const [isShow, setIsShow] = useState(false)
  const toggleDrawer = (status: boolean) => () => {
    setIsShow(status)
  }

  const menuList = () => (
    <Container onClick={toggleDrawer(false)}>
      <List>
        <ListItem button>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText>ホーム</ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AssignmentTurnedIn />
          </ListItemIcon>
          <ListItemText>タスク</ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <MenuBook />
          </ListItemIcon>
          <ListItemText>ノート</ListItemText>
        </ListItem>
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
    </AppBar>
  )
}

export default MainAppBar
