import { gql } from '@apollo/client'


export const CreateExercise = gql`
    mutation createExercise($input:ExerciseInput!){
        createExercise(input:$input){
            question,
             _id,
            options,
            correctOption
        }
    }
`

export const DeleteExercise = gql`
    mutation deleteExercise($_id:String!){
        deleteExercise(_id:$_id)
    }
`

export const UpdateExercise = gql`
mutation updateExercise($_id:String! $input:ExerciseUpdateInput!){
    updateExercise(_id:$_id input:$input){
        question,
         _id,
        options,
        correctOption
    }
}
`