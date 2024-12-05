import model from "./model.js";
export function createQuizSubmission(quizSubmission) {
    delete quizSubmission._id;
    return model.create(quizSubmission)
}

// export function findAllQuizAttempt(quizId, userId){
//     const data=model.find({quiz:quizId, user:userId})
//     return data
// }