import * as quizSubmissionDao from "./dao.js"
import * as quizzesDao from "../Quizzes/dao.js"

export default function QuizSubmissionRoute(app) {
    app.post("/api/quizzes/submission", async (req, res) => {
        const quizAttempt = req.body;
        console.log(quizAttempt);
        const quiz = await quizzesDao.findQuizById(quizAttempt.quiz);
        console.log(quiz);
        let score = 0
        quiz.questions.forEach((question) => {
            const response = quizAttempt.responses.find(r => r.questionId === question._id.toString());
            if (response) {
                if (question.type === "mcq") {
                    const correctChoice = question.choices.find(choice => choice.isCorrect === true);
                    if (correctChoice && correctChoice.answer === response.answer) {
                        score += question.points;
                    }
                } else if (question.type === "tf") {
                    // Ensuring both are treated as strings for comparison, or convert both to boolean if necessary
                    if (question.answer.toString() === response.answer.toString()) {
                        score += question.points;
                    }
                } else if (question.type === "fib") {
                    // Assuming possibleAnswers is an array of strings
                    if (question.possibleAnswers.map(answer => answer.toLowerCase()).includes(response.answer.toLowerCase())) {
                        score += question.points;
                    }
                }
            }
        });
        quizAttempt.score = score
        console.log(quizAttempt.score);
        const attempt = await quizSubmissionDao.createQuizSubmission(quizAttempt);
        res.send(attempt);
    });

    app.post("/api/quizzes/attempt", async (req, res) => {
        const quizId = req.body.quizId;
        const userId = req.body.userId;
        const quizzes = await quizSubmissionDao.findAllQuizAttempt(quizId, userId);
        res.send(quizzes);
    });

}