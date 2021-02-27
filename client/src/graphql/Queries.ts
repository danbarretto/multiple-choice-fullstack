import {gql} from '@apollo/client'

export const LoadExercises = gql`
    query{
        LoadExercises{
            _id,
            question,
            options,
            correctOption
          }
    }
`