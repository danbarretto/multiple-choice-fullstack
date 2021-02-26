import { Container } from '@material-ui/core'
import React from 'react'
import { QuestionList } from './components/Question/QuestionList'
import { TopBar } from './components/TopBar'

function App() {
  return (
    <div>
      <TopBar />
      <Container maxWidth='lg'>
        <QuestionList />
      </Container>
    </div>
  )
}

export default App
