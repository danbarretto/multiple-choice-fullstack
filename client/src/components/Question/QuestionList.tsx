import { createStyles, Fab, makeStyles, Theme } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { QuestionItem } from './QuestionItem'
import AddIcon from '@material-ui/icons/Add'
import { useQuery, gql, useMutation } from '@apollo/client'
import { LoadExercises } from '../../graphql/Queries'
import { DeleteExercise } from '../../graphql/Mutations'

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
  _id: string
}

export const QuestionList: React.FC = () => {
  const classes = useStyles()

  const { error, loading, data } = useQuery(LoadExercises)
  const [questions, setQuestions] = useState<Question[]>([])

  useEffect(() => {
    if (data)
      setQuestions(
        data.LoadExercises.map((ex: Question) => {
          const newQuestion: Question = {
            options: ex.options,
            question: ex.question,
            correctOption: ex.correctOption,
            _id: ex._id,
          }
          return newQuestion
        })
      )
  }, [data])

  const [newQuestionIndex, setNewQuestionIndex] = useState(-1)

  const createQuestion = () => {
    const newQuestion: Question = {
      question: '',
      correctOption: 0,
      options: [''],
      _id: '',
    }
    const newQuestions = [...questions]
    const newLength = newQuestions.push(newQuestion)
    setQuestions(newQuestions)
    setNewQuestionIndex(newLength - 1)
  }

  const [deleteExercise, deleteError] = useMutation(DeleteExercise)

  const deleteQuestion = (index: number) => {
    if (deleteError.error) {
      console.error(deleteError.error)
    }
    deleteExercise({
      variables: {
        _id:questions[index]._id,
      },
    }).catch(err=>{
      console.error(err)
    })
    setQuestions(questions.filter((q, qIndex) => index !== qIndex))
  }

  return (
    <div className={classes.root}>
      {questions.map((q, index: number) => (
        <QuestionItem
          key={`qItem${q._id}`}
          _id={q._id}
          question={q.question}
          options={q.options}
          correctOption={q.correctOption}
          deleteQuestion={() => deleteQuestion(index)}
          initialMode={index === newQuestionIndex ? 'edit' : 'view'}
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
