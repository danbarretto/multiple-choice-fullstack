import { Exercise } from "../entities/Exercise";
import { Arg, Field, InputType, Int, Mutation, Query, Resolver } from "type-graphql";
import { getMongoRepository } from "typeorm";
import { ObjectId } from "mongodb";

@InputType()
class ExerciseInput {
    @Field()
    question: string

    @Field(() => Int)
    correctOption: number

    @Field(() => [String])
    options: string[]
}

@InputType()
class ExerciseUpdateInput {

    @Field({ nullable: true })
    question?: string

    @Field(() => [String], { nullable: true })
    options?: string[]

    @Field(() => Int, { nullable: true })
    correctOption?: number
}


@Resolver()
export class ExerciseResolver {
    @Mutation(() => Exercise)
    async createExercise(@Arg('input') input: ExerciseInput) {
        if (input.correctOption >= input.options.length) {
            return new Error('correctOption must be a valid index')
        }
        const exercise = await Exercise.create(input).save()
        return exercise
    }

    @Mutation(() => Exercise)
    async updateExercise(
        @Arg('_id') _id: string,
        @Arg('input') input: ExerciseUpdateInput) {

        const exerciseRepo = getMongoRepository(Exercise)
        const exercise = await exerciseRepo.findOne(_id)

        if (input.correctOption && input.options && input.correctOption >= input.options.length
            || (!input.options && input.correctOption && exercise && input.correctOption >= exercise.options.length)) {
            return new Error('correctOption must be a valid index')
        }

        if (exercise) {

            await exerciseRepo.updateOne(exercise, {
                $set: { ...input }
            })
            await exercise.reload()
            return exercise
        }
        return new Error('Could not find exercise')
    }

    @Mutation(() => Boolean)
    async deleteExercise(@Arg('_id') _id: string) {
        const exerciseRepo = getMongoRepository(Exercise)
        try {
            await exerciseRepo.findOneAndDelete({ _id: new ObjectId(_id) })
        } catch (error) {
            console.error(error)
            return false
        }
        return true
    }

    @Query(() => [Exercise])
    LoadExercises() {
            return Exercise.find()
    }
}