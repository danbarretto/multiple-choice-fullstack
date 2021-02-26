import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  createStyles,
  Fab,
  FormControlLabel,
  Grid,
  IconButton,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
  Theme,
} from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import Delete from '@material-ui/icons/Delete'
import React, { useState } from 'react'
import { green } from '@material-ui/core/colors'
import DoneIcon from '@material-ui/icons/Done'
import DeleteIcon from '@material-ui/icons/Delete'

interface Props {
  question: string
  correctOption: number
  options: string[]
  finishEditng: (
    qustion: string,
    newCorrectOption: number,
    newOptions: string[]
  ) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      color: theme.palette.common.white,
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[600],
      },
    },
    trashFab: {
      marginLeft: '1em',
    },
  })
)

export const QuestionEdit: React.FC<Props> = ({
  question,
  correctOption,
  options,
  finishEditng,
}) => {
  const classes = useStyles()
  const [newQuestion, setNewQuestion] = useState(question)
  const [newCorrectOption, setNewCorrectOption] = useState(correctOption)
  const [values, setValues] = useState(options)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCorrectOption(
      Number.parseInt((event.target as HTMLInputElement).value)
    )
  }

  const removeOption = (item: number) => {
    setValues(values.filter((i, index) => index !== item))
  }

  const createRadioBtn = (index: number) => {
    return (
      <FormControlLabel
        key={`formControl${index}${question}`}
        value={index}
        style={{ marginTop: '.5em' }}
        label={
          <div>
            <TextField
              //key={`txt${index}${question}`}
              label='Nova opção'
              value={values[index]}
              multiline
              onChange={(e) => {
                const newValues = [...values]
                newValues[index] = e.target.value
                setValues(newValues)
              }}
            />
            <Fab
              size='small'
              className={classes.trashFab}
              onClick={() => removeOption(index)}
            >
              <DeleteIcon />
            </Fab>
          </div>
        }
        control={<Radio key={`radio${question}${index}`} color='primary' />}
      />
    )
  }
  /*const [radioBtns, setRadioBtns] = useState(
    values.map((op, index) => createRadioBtn(index))
  )*/

  const addOptions = () => {
    const newValues = [...values]
    newValues.push('')
    setValues(newValues)
  }
  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <TextField
          label={'Novo enunciado'}
          value={newQuestion}
          multiline
          onChange={(e) => setNewQuestion(e.target.value)}
        ></TextField>

        <IconButton onClick={(event) => event.stopPropagation()}>
          <Delete />
        </IconButton>
      </AccordionSummary>
      <AccordionDetails>
        <RadioGroup
          defaultValue={correctOption}
          value={newCorrectOption}
          onChange={handleChange}
        >
          {values.map((op, index) => createRadioBtn(index))}
        </RadioGroup>
        <Fab
          color='secondary'
          className={classes.fab}
          //onClick={() => finishEditng(newQuestion, newCorrectOption, values)}
          onClick={() => addOptions()}
        >
          <DoneIcon />
        </Fab>
      </AccordionDetails>
    </Accordion>
  )
}
