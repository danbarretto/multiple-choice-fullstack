import { createStyles, makeStyles, Theme } from '@material-ui/core'
import React, { useState } from 'react'
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

  const deleteQuestion = (index:number) =>{
    setQuestions(questions.filter((q,qIndex)=>index!== qIndex))
  }

  return (
    <div className={classes.root}>
      {questions.map((q, index) => (
        <QuestionItem
          key={`qItem${q.question}${index}`}
          question={q.question}
          options={q.options}
          correctOption={q.correctOption}
          deleteQuestion={()=>deleteQuestion(index)}
        />
      ))}
    </div>
  )
}
