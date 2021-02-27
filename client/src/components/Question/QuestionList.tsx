import { createStyles, Fab, makeStyles, Theme } from '@material-ui/core'
import React, { useState } from 'react'
import { QuestionItem } from './QuestionItem'
import AddIcon from '@material-ui/icons/Add'

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
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
)

interface Question {
  question: string
  options: string[]
  correctOption: number
}

export const QuestionList: React.FC = () => {
  const classes = useStyles()

  const [questions, setQuestions] = useState<Question[]>([
    { question: 'Responda A', correctOption: 0, options: ['A', 'B', 'C', 'D'] },
    { question: 'Responda B', correctOption: 1, options: ['A', 'B', 'C', 'D'] },
    { question: 'Responda C', correctOption: 2, options: ['A', 'B', 'C', 'D'] },
  ])
  const [newQuestionIndex, setNewQuestionIndex] = useState(-1)

  const createQuestion = () => {
    const newQuestion: Question = {
      question: '',
      correctOption: 0,
      options: [],
    }
    const newQuestions = [...questions]
    const newLength = newQuestions.push(newQuestion)
    setQuestions(newQuestions)
    setNewQuestionIndex(newLength - 1)
  }

  const deleteQuestion = (index: number) => {
    setQuestions(questions.filter((q, qIndex) => index !== qIndex))
  }

  return (
    <div className={classes.root}>
      {questions.map((q, index:number) => (
        <QuestionItem
          key={`qItem${q.question}${index}`}
          question={q.question}
          options={q.options}
          correctOption={q.correctOption}
          deleteQuestion={() => deleteQuestion(index)}
          initialMode={index===newQuestionIndex ? 'edit' : 'view'}
        />
      ))}
      <Fab
        className={classes.fab}
        color='secondary'
        onClick={() => createQuestion()}
      >
        <AddIcon />
      </Fab>
    </div>
  )
}
