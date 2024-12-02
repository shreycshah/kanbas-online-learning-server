// import Database from "../Database/index.js";
import model from "./model.js";
export function findQuizzesForCourse(courseId) {
    return model.find({ course: courseId });
}
export function createQuiz(quiz) {
    delete quiz._id
    return model.create(quiz);
}
export function deleteQuiz(quizId) {
    return model.findByIdAndDelete(quizId);
}

export function updateQuiz(quizId, quizUpdates) {
    return model.updateOne({ _id: quizId }, quizUpdates);
}