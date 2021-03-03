import { Container } from '@material-ui/core'
import React from 'react'
import { QuestionList } from './components/Question/QuestionList'
import { TopBar } from './components/TopBar'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => alert(`Graphql error ${message}`))
  }
})

const link = from([
  errorLink,
  new HttpLink({
    uri:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:4000/graphql'
        : process.env.DATABASE_URL,
  }),
])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
})

function App() {
  return (
    <ApolloProvider client={client}>
      <TopBar />
      <Container maxWidth='lg'>
        <QuestionList />
      </Container>
    </ApolloProvider>
  )
}

export default App
