import model from "./model.js";
export function createQuizSubmission(quizSubmission) {
    delete quizSubmission._id;
    return model.create(quizSubmission)
}

export async function findAllQuizAttempt(quizId, userId) {
    const data = await model.find({ quiz: quizId, user: userId });
    console.log(data);
    return data;
}