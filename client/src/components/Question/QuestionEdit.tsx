import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  FormControlLabel,
  Grid,
  IconButton,
  makeStyles,
  Radio,
  RadioGroup,
  TextareaAutosize,
  TextField,
  Theme,
} from '@material-ui/core'
import { Clear, ExpandMore } from '@material-ui/icons'
import React, { useState } from 'react'
import { green } from '@material-ui/core/colors'
import DoneIcon from '@material-ui/icons/Done'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'

interface Props {
  question: string
  correctOption: number
  options: string[]
  isNewQuestion: boolean
  cancelEdit: () => void
  deleteQuestion: () => void
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
    },
    trashFab: {
      marginLeft: '1em',
    },
    doneButton: {
      color: theme.palette.common.white,
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[600],
      },
    },
  })
)

export const QuestionEdit: React.FC<Props> = ({
  question,
  correctOption,
  options,
  finishEditng,
  cancelEdit,
  isNewQuestion,
  deleteQuestion,
}) => {
  const classes = useStyles()
  const [newQuestion, setNewQuestion] = useState(question)
  const [newCorrectOption, setNewCorrectOption] = useState(correctOption)
  const [values, setValues] = useState(options)
  const [errors, setErrors] = useState<string[]>([])

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
          <Grid
            container
            direction='row'
            justify='flex-start'
            alignItems='center'
          >
            <TextareaAutosize
              //key={`txt${index}${question}`}
              //label='Nova opção'
              value={values[index]}
              //multiline

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
          </Grid>
        }
        control={<Radio key={`radio${question}${index}`} color='primary' />}
      />
    )
  }

  const addOptions = () => {
    const newValues = [...values]
    newValues.push('')
    setValues(newValues)
  }

  const validateFields = () => {
    const errs: string[] = []
    if (!newQuestion || newQuestion === '') {
      errs.push('Enunciado não pode estar vazio!')
    }
    values.forEach((option, index) => {
      if (!option || option === '') {
        errs.push(`Opção ${index + 1} não pode estar vazia!`)
      }
    })
    if(values.length === 1) errs.push('Deve haver mais de 1 opção!')

    setErrors(errs)
    if (errs.length === 0) finishEditng(newQuestion, newCorrectOption, values)
  }

  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Grid
          container
          direction='row'
          justify='space-between'
          alignItems='center'
        >
          <TextField
            label={'Novo enunciado'}
            value={newQuestion}
            multiline
            style={{ width: '50%' }}
            onChange={(e) => setNewQuestion(e.target.value)}
          ></TextField>

          <div>
            <IconButton
              className={classes.doneButton}
              size='medium'
              onClick={(e) => {
                e.stopPropagation()
                validateFields()
              }}
            >
              <DoneIcon />
            </IconButton>
            <IconButton
              size='medium'
              onClick={(event) => {
                event.stopPropagation()
                if (isNewQuestion) {
                  deleteQuestion()
                  return
                }
                cancelEdit()
              }}
            >
              <Clear />
            </IconButton>
          </div>
        </Grid>
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
          size='medium'
          className={classes.fab}
          color='secondary'
          onClick={() => addOptions()}
        >
          <AddIcon />
        </Fab>
        {errors.length > 0 && (
          <Dialog open={errors.length > 0}>
            <DialogTitle>Erro!</DialogTitle>
            <DialogContent>
              {errors.map((err) => (
                <DialogContentText key={err}>{`${err}\n`}</DialogContentText>
              ))}
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setErrors([])
                }}
              >
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </AccordionDetails>
    </Accordion>
  )
}
