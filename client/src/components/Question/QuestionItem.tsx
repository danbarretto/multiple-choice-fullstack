import { createStyles, makeStyles, Theme } from '@material-ui/core'
import React, { useState } from 'react'
import { QuestionView } from './QuestionView'
import { QuestionEdit } from './QuestionEdit'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      fontSize: theme.typography.pxToRem(20),
      flexBasis: '90%',
      flexShrink: 0,
    },
    button: {
      alignSelf: 'center',
    },
    container: {
      margin: '1.5em',
    },
  })
)

interface Props {
  question: string
  options: string[]
  correctOption: number
  deleteQuestion: ()=>void
}

export const QuestionItem: React.FC<Props> = (props) => {
  const classes = useStyles()

  const [mode, setMode] = useState('view')
  const [question, setQuestion] = useState(props.question)
  const [correctOption, setCorrectOption] = useState(props.correctOption)
  const [options, setOptions] = useState(props.options)


  return (
    <div className={classes.container}>
      {mode === 'view' ? (
        <QuestionView
          correctOption={correctOption}
          options={options}
          question={question}
          setMode={setMode}
          deleteQuestion={props.deleteQuestion}
        />
      ) : (
        <QuestionEdit
          question={question}
          correctOption={correctOption}
          options={options}
          deleteQuestion={props.deleteQuestion}
          finishEditng={(newQuestion, newCorrectOption, newOptions)=>{
            setQuestion(newQuestion)
            setCorrectOption(newCorrectOption)
            setOptions(newOptions)
            setMode('view')
          }}
        />
      )}
    </div>
  )
}
