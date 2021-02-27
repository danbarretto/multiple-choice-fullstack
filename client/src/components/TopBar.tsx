import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core'


/*const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },  
  })
)*/
export const TopBar: React.FC = () => {
  //const classes = useStyles()

  return (
    <div>
      <AppBar position='static'>
        <Toolbar variant='dense'>
          <Typography variant='h6' color='inherit'>
            Muitas Escolhas Mesmo!
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}
