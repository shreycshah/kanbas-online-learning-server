import model from "./model.js";
export function createQuizSubmission(quiz){
    return model.create(quiz)
}

export function findAllQuizAttempt(quizId, userId){
    const data=model.find({quiz:quizId, user:userId})
    return data
}