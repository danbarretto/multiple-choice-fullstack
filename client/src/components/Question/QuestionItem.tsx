import { createStyles, makeStyles, Theme } from '@material-ui/core'
import React, { useState } from 'react'
import { QuestionView } from './QuestionView'
import { QuestionEdit } from './QuestionEdit'
import { useMutation } from '@apollo/client'
import { CreateExercise, UpdateExercise } from '../../graphql/Mutations'

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
  initialMode?: string
  deleteQuestion: () => void
  _id: string
}

interface ExerciseInput {
  question: string
  options: string[]
  correctOption: number
}

interface ExerciseUpdateInput {
  question?: string
  options?: string[]
  correctOption?: number
}

export const QuestionItem: React.FC<Props> = (props) => {
  const classes = useStyles()

  const [mode, setMode] = useState('view')
  const [question, setQuestion] = useState(props.question)
  const [correctOption, setCorrectOption] = useState(props.correctOption)
  const [options, setOptions] = useState(props.options)
  const [initialMode, setInitialMode] = useState(props.initialMode)
  const [_id, setId] = useState(props._id)

  const [createExercise, createError] = useMutation(CreateExercise)
  const [updateExercise, updateError] = useMutation(UpdateExercise)

  const createExerciseAux = async (
    newQuestion: string,
    newCorrectOption: number,
    newOptions: string[]
  ) => {
    //Saves data to DB
    const input: ExerciseInput = {
      question: newQuestion,
      correctOption: newCorrectOption,
      options: newOptions,
    }
    const data = await createExercise({
      variables: {
        input,
      },
    })
    setId(data.data.createExercise?._id)
  }

  const updateExerciseAux = async (
    newQuestion?: string,
    newCorrectOption?: number,
    newOptions?: string[]
  ) => {
    const input: ExerciseUpdateInput = {
      question: newQuestion,
      correctOption: newCorrectOption,
      options: newOptions,
    }
    updateExercise({
      variables: {
        _id,
        input,
      },
    })
  }

  const finishEditing = async (
    newQuestion: string,
    newCorrectOption: number,
    newOptions: string[]
  ) => {
    setQuestion(newQuestion)
    setCorrectOption(newCorrectOption)
    setOptions(newOptions)
    setMode('view')
    if (initialMode === 'edit') {
      createExerciseAux(newQuestion, newCorrectOption, newOptions)
    } else {
      updateExerciseAux(newQuestion, newCorrectOption, newOptions)
    }
    setInitialMode(undefined)
  }

  return (
    <div className={classes.container}>
      {(initialMode && initialMode === 'edit') || mode === 'edit' ? (
        <QuestionEdit
          question={question}
          correctOption={correctOption}
          options={options}
          cancelEdit={()=>setMode('view')}
          finishEditng={finishEditing}
          deleteQuestion={props.deleteQuestion}
          isNewQuestion={initialMode === 'edit'}
        />
      ) : (
        <QuestionView
          correctOption={correctOption}
          options={options}
          question={question}
          setMode={setMode}
          deleteQuestion={props.deleteQuestion}
        />
      )}
    </div>
  )
}
