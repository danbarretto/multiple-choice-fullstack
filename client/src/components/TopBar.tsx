import React from 'react'
import {
  AppBar,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },  
  })
)
export const TopBar: React.FC = () => {
  const classes = useStyles()

  return (
    <div>
      <AppBar position='static'>
        <Toolbar variant='dense'>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' color='inherit'>
            Muitas Escolhas Mesmo!
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}
