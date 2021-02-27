import {gql} from '@apollo/client'

export const LoadExercises = gql`
    query{
        exercises{
            question,
              options,
            correctOption
          }
    }
`