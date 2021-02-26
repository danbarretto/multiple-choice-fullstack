import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  createStyles,
  FormControlLabel,
  Grid,
  IconButton,
  makeStyles,
  Radio,
  RadioGroup,
  Theme,
  Typography,
} from '@material-ui/core'
import Edit from '@material-ui/icons/Edit'
import Delete from '@material-ui/icons/Delete'

import React, { useState } from 'react'
import { ExpandMore } from '@material-ui/icons'

interface Props {
  question: string
  options: string[]
  correctOption: number
  setMode: (mode: string) => void
}

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

export const QuestionView: React.FC<Props> = ({
  question,
  options,
  correctOption,
  setMode,
}) => {
  const [selectedOp, setSelectctedOp] = useState(0)
  const classes = useStyles()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectctedOp(Number.parseInt((event.target as HTMLInputElement).value))
  }

  const handleAnswer = () => {
    if (selectedOp === correctOption) {
      alert('Boa carai')
    }
  }

  const radioBtns = options.map((op, index) => (
    <FormControlLabel
      value={index}
      label={op}
      labelPlacement='end'
      control={<Radio color='primary' />}
    />
  ))

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography className={classes.heading}>{question}</Typography>

        <IconButton onClick={() => setMode('edit')}>
          <Edit />
        </IconButton>

        <IconButton onClick={(event) => event.stopPropagation()}>
          <Delete />
        </IconButton>
      </AccordionSummary>
      <AccordionDetails>
        <Grid
          container
          direction='column'
          justify='center'
          alignItems='flex-start'
        >
          <RadioGroup value={selectedOp} onChange={handleChange}>
            {radioBtns}
          </RadioGroup>
          <Button
            variant='contained'
            className={classes.button}
            onClick={handleAnswer}
          >
            Ok
          </Button>
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}
