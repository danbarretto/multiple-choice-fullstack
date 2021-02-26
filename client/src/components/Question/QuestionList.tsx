import { createStyles, makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { QuestionItem } from './QuestionItem'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: 15,
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  })
)

export const QuestionList: React.FC = () => {
  const classes = useStyles()


  return (
    <div className={classes.root}>
      <QuestionItem
        question='Responda A'
        options={['A', 'B', 'C', 'D']}
        correctOption={0}
      />
      <QuestionItem
        question='Responda B'
        options={['A', 'B', 'C', 'D']}
        correctOption={1}
      />
      <QuestionItem
        question='Responda C'
        options={['A', 'B', 'C', 'D']}
        correctOption={2}
      />
    </div>
  )
}
